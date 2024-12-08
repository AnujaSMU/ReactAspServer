using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MCDA_Project.Server.Models;
using MCDA_Project.Server.Data;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MCDA_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RecipeFinderContext _context;
        private readonly IConfiguration _configuration; // Injected for token configuration

        public UsersController(RecipeFinderContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/Users/Register
        [HttpPost("Register")]
        public async Task<ActionResult<User>> RegisterUser([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Username and Password are required.");
            }

            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("Username already exists.");
            }

            // Hash password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Ensure optional fields have default values if null
            user.City ??= string.Empty;
            user.ProvinceState ??= string.Empty;
            user.Country ??= string.Empty;
            user.PostalCode ??= string.Empty;
            user.PhoneNumber ??= string.Empty;
            user.EmailAddress ??= string.Empty;
            user.CreditCardNumber ??= string.Empty;
            user.CreditCardType ??= string.Empty;
            user.ExpiryDate = user.ExpiryDate == default ? DateTime.Now.AddYears(3) : user.ExpiryDate;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AuthenticateUser), new { username = user.Username }, user);
        }

        // POST: api/Users/Authenticate
        [HttpPost("Authenticate")]
        public async Task<ActionResult> AuthenticateUser([FromBody] LoginRequest loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Username and Password are required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null)
            {
                return Unauthorized("Invalid username.");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid password.");
            }

            // Generate a token
            var token = GenerateToken(user);

            // Set the token as a cookie
            Response.Cookies.Append("AuthToken", token, new CookieOptions
            {
                HttpOnly = true, // Prevents client-side access
                Secure = true, // Requires HTTPS
                SameSite = SameSiteMode.Strict, // Strict cookie sharing
                Expires = DateTime.UtcNow.AddHours(1) // Token expiration
            });

            return Ok($"Welcome, {user.Username}!");
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString())
            };

            // Use the key directly from the configuration
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // GET: api/Users/order/{id}
        [HttpGet("order/{id}")]
        public async Task<ActionResult> GetUserDetails(int id)
        {
            // Fetch the user with the specified UserID
            var user = await _context.Users
                .Where(u => u.UserID == id)
                .Select(u => new
                {
                    u.FirstName,
                    u.LastName,
                    CreditCardNumber = UsersController.MaskCreditCardNumber(u.CreditCardNumber) // Static method call
                })
                .FirstOrDefaultAsync();

            // Check if the user exists
            if (user == null)
            {
                return NotFound(new { Message = $"User with ID {id} not found." });
            }

            // Return the user details
            return Ok(user);
        }

        public static string MaskCreditCardNumber(string creditCardNumber)
        {
            // Assuming the CreditCardNumber is in the format: 1231123353351234
            if (string.IsNullOrEmpty(creditCardNumber) || creditCardNumber.Length < 4)
            {
                return creditCardNumber; // Return the original if it is too short or null
            }

            // Mask all but the last 4 digits
            return string.Join(" ", new string[]
            {
        "****", "****", "****", creditCardNumber.Substring(creditCardNumber.Length - 4)
            });
        }
    }

    // DTO for login request
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
