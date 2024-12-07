using MCDA_Project.Server.Models;
using static System.Net.Mime.MediaTypeNames;

namespace MCDA_Project.Server.Models
{
    public class Recipe
    {
        public int RecipeID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Steps { get; set; } // Could store JSON or plain text
        public int Views { get; set; }

        // Foreign Key
        public int AuthorID { get; set; }
        public User Author { get; set; }

        // Navigation Properties
        public ICollection<Image> Images { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
    }
}
