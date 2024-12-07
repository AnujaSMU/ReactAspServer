import React from 'react'
import { useParams } from 'react-router-dom'

function RecipePage() {
  const { recipeID } = useParams();
  const recipe = {
                    "RecipeID": 1,
                    "Title": "Spaghetti Carbonara",
                    "Description": "Classic Italian pasta dish",
                    "Steps": "1. Boil pasta\n2. Cook pancetta\n3. Mix eggs and cheese\n4. Combine all ingredients",
                    "AuthorID": 123,
                    "Views": 1500,
                    "Ingredients": [
                        {
                            "IngredientID": 1,
                            "Name": "Spaghetti",
                            "CostPerUnit": 2.99,
                            "Unit": "Lb"
                        },
                        {
                            "IngredientID": 2,
                            "Name": "Eggs",
                            "CostPerUnit": 1.50,
                            "Unit": "piece"
                        },
                        {
                            "IngredientID": 3,
                            "Name": "Tomato",
                            "CostPerUnit": 0.50,
                            "Unit": "piece"
                        },
                        {
                            "IngredientID": 4,
                            "Name": "Chicken",
                            "CostPerUnit": 5.99,
                            "Unit": "Lb"
                        }
                    ],
                    "Images": [
                        {
                            "ImageID": 1,
                            "ImageUrl": "https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755"
                        }
                    ]
                };

  return (
    <div>
      <h1>Recipe ID: {recipeID}</h1>
    </div>
  )
}

export default RecipePage