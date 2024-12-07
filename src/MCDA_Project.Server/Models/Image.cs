namespace MCDA_Project.Server.Models
{
    public class Image
    {
        public int ImageID { get; set; }
        public string ImageURL { get; set; }

        // Foreign Key
        public int RecipeID { get; set; }
        public Recipe Recipe { get; set; }
    }

}
