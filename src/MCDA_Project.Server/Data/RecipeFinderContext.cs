using MCDA_Project.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace MCDA_Project.Server.Data
{
    public class RecipeFinderContext : DbContext
    {
        public RecipeFinderContext(DbContextOptions<RecipeFinderContext> options) : base(options)
        {
        }

        // DbSets for each model
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure composite relationships in RecipeIngredient
            modelBuilder.Entity<RecipeIngredient>()
                .HasKey(ri => ri.RecipeIngredientID);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.RecipeID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(i => i.RecipeIngredients)
                .HasForeignKey(ri => ri.IngredientID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure relationships between Users and Recipes
            modelBuilder.Entity<Recipe>()
                .HasOne(r => r.Author)
                .WithMany(u => u.Recipes)
                .HasForeignKey(r => r.AuthorID)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure relationship between Recipes and Images
            modelBuilder.Entity<Image>()
                .HasOne(img => img.Recipe)
                .WithMany(r => r.Images)
                .HasForeignKey(img => img.RecipeID)
                .OnDelete(DeleteBehavior.Cascade);

            // Additional configurations
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

        

            modelBuilder.Entity<Ingredient>()
                .HasIndex(i => i.Name)
                .IsUnique();

            // Define indexes for RecipeIngredients
            modelBuilder.Entity<RecipeIngredient>()
                .HasIndex(ri => ri.IngredientID)
                .HasDatabaseName("IX_RecipeIngredients_IngredientID");

            modelBuilder.Entity<RecipeIngredient>()
                .HasIndex(ri => ri.RecipeID)
                .HasDatabaseName("IX_RecipeIngredients_RecipeID");

            base.OnModelCreating(modelBuilder);
        }
    }
}
