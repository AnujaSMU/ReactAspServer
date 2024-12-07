using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MCDA_Project.Server.Models;
using MCDA_Project.Server.Data;

namespace MCDA_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly RecipeFinderContext _context;

        public UsersController(RecipeFinderContext context)
        {
            _context = context;
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

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

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
        public async Task<ActionResult<string>> AuthenticateUser([FromBody] LoginRequest loginRequest)
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

            // Verify the password
            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid password.");
            }

            // Authentication successful
            return Ok($"Welcome, {user.Username}!");
        }
    }

    // DTO for login request
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
