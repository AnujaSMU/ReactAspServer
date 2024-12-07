using Microsoft.AspNetCore.Mvc;
using MCDA_Project.Server.Data;
using MCDA_Project.Server.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MCDA_Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IngredientsController : ControllerBase
    {
        private readonly RecipeFinderContext _context;
        public IngredientsController(RecipeFinderContext context)
        {
            _context = context;
        }


        // GET: api/Ingredients
        [HttpGet]
        public async Task<IActionResult> GetAllIngredients()
        {
            var ingredients = _context.Ingredients
                .Select(i => new{
                i.IngredientID,
                i.Name
            })
                .ToList();

            return Ok(ingredients);
        }
    }
}
