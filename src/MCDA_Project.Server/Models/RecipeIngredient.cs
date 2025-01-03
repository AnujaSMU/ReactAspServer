﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MCDA_Project.Server.Models
{
    public class RecipeIngredient
    {
        public int RecipeIngredientID { get; set; }

        // Foreign Keys
        public int RecipeID { get; set; }
        public Recipe Recipe { get; set; }

        public int IngredientID { get; set; }
        public Ingredient Ingredient { get; set; }

        public decimal Quantity { get; set; }
    }



}
