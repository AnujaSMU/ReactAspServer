using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MCDA_Project.Server.Data;
using System.Linq;
using MCDA_Project.Server.Models;

namespace MCDA_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeFinderContext _context;

        public RecipeController(RecipeFinderContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetRecipeDetails(int id)
        {
            // Query the database to fetch the recipe with the given ID
            var recipe = _context.Recipes
                .Include(r => r.Images) // Include related images
                .Include(r => r.RecipeIngredients)
                .ThenInclude(ri => ri.Ingredient) // Include related ingredients
                .Where(r => r.RecipeID == id)
                .Select(r => new
                {
                    r.RecipeID,
                    r.Title,
                    r.Description,
                    r.Steps,
                    r.Views,
                    Author = new
                    {
                        r.Author.UserID,
                        r.Author.Username
                    },
                    Ingredients = r.RecipeIngredients.Select(ri => new
                    {
                        ri.Ingredient.IngredientID,
                        ri.Ingredient.Name,
                        ri.Quantity,
                        ri.Ingredient.CostPerUnit // Add cost information from the Ingredients table
                    }),
                    Images = r.Images.Select(img => img.ImageURL)
                })
                .FirstOrDefault();

            if (recipe == null)
            {
                return NotFound(new { Message = $"Recipe with ID {id} not found." });
            }

            return Ok(recipe);
        }

        [HttpGet("trending-recipes")]
        public IActionResult GetTopRecipes()
        {
            // Query the database to get the top 6 recipes with the most views
            var topRecipes = _context.Recipes
                .Include(r => r.Images) // Include related images
                .Include(r => r.RecipeIngredients)
                .ThenInclude(ri => ri.Ingredient) // Include related ingredients
                .OrderByDescending(r => r.Views) // Order recipes by Views in descending order
                .Take(6) // Take the top 6 recipes
                .Select(r => new
                {
                    r.RecipeID,
                    r.Title,
                    r.Description,
                    r.Views,
                    Ingredients = r.RecipeIngredients.Select(ri => new
                    {
                        ri.Ingredient.IngredientID,
                        ri.Ingredient.Name,
                        ri.Quantity,
                        ri.Ingredient.CostPerUnit
                    }),
                    Images = r.Images.Select(img => img.ImageURL)
                })
                .ToList();

            if (topRecipes == null || !topRecipes.Any())
            {
                return NotFound(new { Message = "No recipes found." });
            }

            return Ok(topRecipes);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            // Find the recipe with the given ID
            var recipe = await _context.Recipes
                .Include(r => r.RecipeIngredients) // Include related RecipeIngredients
                .Include(r => r.Images) // Include related Images
                .FirstOrDefaultAsync(r => r.RecipeID == id);

            if (recipe == null)
            {
                return NotFound(new { Message = $"Recipe with ID {id} not found." });
            }

            // Remove related RecipeIngredients
            _context.RecipeIngredients.RemoveRange(recipe.RecipeIngredients);

            // Remove related Images
            _context.Images.RemoveRange(recipe.Images);

            // Remove the recipe itself
            _context.Recipes.Remove(recipe);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Recipe with ID {id} has been successfully deleted." });
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRecipe([FromBody] CreateRecipeRequest request)
        {
            // Validate the request
            if (request == null || string.IsNullOrEmpty(request.Title) || request.AuthorID <= 0)
            {
                return BadRequest(new { Message = "Invalid recipe data or missing AuthorID." });
            }

            // Check if the author exists
            var author = await _context.Users.FirstOrDefaultAsync(u => u.UserID == request.AuthorID);
            if (author == null)
            {
                return NotFound(new { Message = $"Author with ID {request.AuthorID} not found." });
            }

            // Create a new recipe entity
            var newRecipe = new Recipe
            {
                Title = request.Title,
                Description = request.Description,
                Steps = request.Steps,
                Views = 0, // Initialize views to 0
                AuthorID = request.AuthorID
            };

            // Add ingredients to the recipe
            if (request.Ingredients != null && request.Ingredients.Any())
            {
                newRecipe.RecipeIngredients = request.Ingredients.Select(i => new RecipeIngredient
                {
                    IngredientID = i.IngredientID,
                    Quantity = i.Quantity
                }).ToList();
            }

            // Add images to the recipe
            if (request.Images != null && request.Images.Any())
            {
                newRecipe.Images = request.Images.Select(url => new Image
                {
                    ImageURL = url
                }).ToList();
            }

            // Add the new recipe to the context
            _context.Recipes.Add(newRecipe);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecipeDetails), new { id = newRecipe.RecipeID }, new { Message = "Recipe created successfully.", RecipeID = newRecipe.RecipeID });
        }





    }

    public class CreateRecipeRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Steps { get; set; }
        public int AuthorID { get; set; }
        public List<CreateRecipeIngredientRequest> Ingredients { get; set; }
        public List<string> Images { get; set; }
    }

    public class CreateRecipeIngredientRequest
    {
        public int IngredientID { get; set; }
        public decimal Quantity { get; set; }
    }

}
