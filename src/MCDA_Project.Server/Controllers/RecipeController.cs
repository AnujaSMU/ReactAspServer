﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MCDA_Project.Server.Data;
using System.Linq;

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
                        ri.Quantity
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
    }
}