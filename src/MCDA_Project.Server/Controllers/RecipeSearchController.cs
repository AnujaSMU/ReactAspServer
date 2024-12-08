using MCDA_Project.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace MCDA_Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeSearchController : ControllerBase
    {
        private readonly RecipeFinderContext _context;
        private readonly IMemoryCache _cache;

        public RecipeSearchController(RecipeFinderContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;

        }




        // POST: api/RecipeSearch/FindByIngredients
        [HttpPost("FindByIngredients")]
        public IActionResult FindRecipesByIngredients([FromBody] List<int> ingredientIds)
        {
            if (ingredientIds == null || !ingredientIds.Any())
                return BadRequest("Ingredient list cannot be empty.");

            // Generate a cache key based on the ingredient IDs
            string cacheKey = $"Recipes_{string.Join("_", ingredientIds.OrderBy(id => id))}";

            // Check if the result is already cached
            if (_cache.TryGetValue(cacheKey, out List<object> cachedRecipes))
            {
                return Ok(cachedRecipes);
            }

            List<object> matchingRecipes = null;

            // Start with all ingredients and progressively reduce
            for (int i = 0; i < ingredientIds.Count && matchingRecipes == null; i++)
            {
                // Get the current subset of ingredients (N-i)
                var currentIngredients = ingredientIds.Take(ingredientIds.Count - i).ToList();

                // Fetch recipes where all required ingredients are in the current subset
                matchingRecipes = _context.Recipes
                    .Where(recipe =>
                        recipe.RecipeIngredients
                            .All(ri => currentIngredients.Contains(ri.IngredientID)))
                    .Select(recipe => new
                    {
                        recipe.RecipeID,
                        recipe.Title,
                        recipe.Description,
                        Images = recipe.Images.Select(img => img.ImageURL).ToList(),
                        Ingredients = recipe.RecipeIngredients
                            .Select(ri => new
                            {
                                ri.Ingredient.IngredientID,
                                ri.Ingredient.Name,
                                ri.Ingredient.CostPerUnit
                            }).ToList()
                    })
                    .Take(6) // Limit the result to 6 recipes
                    .ToList();

                // If the result is not empty, we stop searching with smaller subsets
                if (matchingRecipes.Any())
                {
                    break;
                }
            }

            // If no matching recipes found, return an empty response
            if (matchingRecipes == null || !matchingRecipes.Any())
            {
                return NotFound("No recipes found.");
            }

            // Cache the result
            var cacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10), // Cache for 10 minutes
                SlidingExpiration = TimeSpan.FromMinutes(5)                // Extend expiration if accessed
            };

            _cache.Set(cacheKey, matchingRecipes, cacheOptions);

            return Ok(matchingRecipes);
        }


    }

}