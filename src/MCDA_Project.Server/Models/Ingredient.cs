namespace MCDA_Project.Server.Models
{
    public class Ingredient
    {
        public int IngredientID { get; set; }
        public string Name { get; set; }
        public decimal CostPerUnit { get; set; } // Supports cost in various units

        // Navigation Property
        public ICollection<RecipeIngredient> RecipeIngredients { get; set; }
    }
}
