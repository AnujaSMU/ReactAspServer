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

            // Fetch recipes that match all the given ingredients (exact match)
            var matchingRecipes = _context.Recipes
                .Where(recipe =>
                    recipe.RecipeIngredients
                        .All(ri => ingredientIds.Contains(ri.IngredientID))) // Exact match
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
                        }).ToList(),
                    IsExactMatch = true // Flag for exact match
                })
                .Take(12) // Limit the result to a maximum of 12 recipes
                .ToList();

            // If no recipes are found, expand the search to include recipes with more ingredients
            if (matchingRecipes.Count < 6)
            {
                // Add more recipes that contain at least one of the provided ingredients and may have additional ingredients
                var additionalRecipes = _context.Recipes
                    .Where(recipe =>
                        recipe.RecipeIngredients
                            .Any(ri => ingredientIds.Contains(ri.IngredientID)) // At least one ingredient matches
                        && recipe.RecipeIngredients.Count() >= ingredientIds.Count()) // Ensure recipe uses at least the number of given ingredients
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
                            }).ToList(),
                        IsExactMatch = false // Flag for recipes with additional ingredients
                    })
                    .Take(12 - matchingRecipes.Count) // Add more recipes, up to a total of 12
                    .ToList();

                // Combine the results
                matchingRecipes.AddRange(additionalRecipes);
            }

            // If no matching recipes found after all attempts, return an empty response
            if (!matchingRecipes.Any())
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

            return Ok(matchingRecipes.Take(12)); // Ensure we return a maximum of 12 recipes
        }


    }

}