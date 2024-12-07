using MCDA_Project.Server.Data;
using Microsoft.AspNetCore.Mvc;
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

            // Fetch recipes where all required ingredients are in the provided list
            var matchingRecipes = _context.Recipes
                .Where(recipe =>
                    recipe.RecipeIngredients
                        .All(ri => ingredientIds.Contains(ri.IngredientID)))
                .Select(recipe => new
                {
                    recipe.RecipeID,
                    recipe.Title,
                    recipe.Description
                })
                .ToList();

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