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
            // Validate the request
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Username and Password are required.");
            }

            // Check if the username already exists
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest("Username already exists.");
            }

            // Hash the password (for security)
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Add default values for other fields if not provided
            user.City ??= string.Empty;
            user.ProvinceState ??= string.Empty;
            user.Country ??= string.Empty;
            user.PostalCode ??= string.Empty;
            user.PhoneNumber ??= string.Empty;
            user.EmailAddress ??= string.Empty;
            user.CreditCardNumber ??= string.Empty;
            user.CreditCardType ??= string.Empty;
            user.ExpiryDate = user.ExpiryDate == default ? DateTime.Now.AddYears(3) : user.ExpiryDate;

            // Add the user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.UserID }, user);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            return user;
        }
    }
}
