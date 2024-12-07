import React from 'react'
import { useParams } from 'react-router-dom'

function RecipePage() {
  const { recipeID } = useParams();
  const recipe = {
                    "recipeID": 1,
                    "title": "Spaghetti Carbonara",
                    "description": "Classic Italian pasta dish",
                    "Steps": "1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine pasta, pancetta, and egg mixture.",
                    "author": {
                      "userID": 1,
                      "username": "testuser"
                    },
                    "views": 1500,
                    "ingredients": [
                      {
                        "ingredientID": 1,
                        "name": "Spaghetti",
                        "quantity": 1.5,
                        "costPerUnit": 1.5
                      },
                      {
                        "ingredientID": 2,
                        "name": "Tomato",
                        "quantity": 2.3,
                        "costPerUnit": 0.75
                      },
                      {
                        "ingredientID": 3,
                        "name": "Chicken Breast",
                        "quantity": 3.7,
                        "costPerUnit": 3.5
                      },
                      {
                        "ingredientID": 4,
                        "name": "Ground Beef",
                        "quantity": 4.2,
                        "costPerUnit": 4
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
    <div className="flex-1 bg-[#faf9fb]">
      <div className="h-96 w-full relative">
        <img 
          src={recipe.Images[0].ImageUrl} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
          <h1 className="text-4xl font-bold text-white">{recipe.title}</h1>
          <p className="text-white/80 mt-2">{recipe.description}</p>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Ingredients ({recipeID})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipe.ingredients.map((ingredient) => (
                  <div key={ingredient.ingredientID} className="flex items-center justify-between gap-2 bg-lime-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{ingredient.name}</span>
                      <span className="text-sm text-gray-600">
                        (${ingredient.costPerUnit} per {ingredient.unit})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <div className="flex flex-col gap-4">
                {recipe.Steps.split('. ').filter(step => step && !(/^\d+$/.test(step))).map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="bg-lime-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{step.replace(/^\d+\.\s*/, '').trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="text-2xl font-bold mb-2">Total Price</div>
            <div className="text-3xl font-bold text-lime-600 mb-4">
              ${recipe.ingredients.reduce((total, ing) => total + (ing.quantity * ing.costPerUnit), 0).toFixed(2)}
            </div>
            <button className="w-full bg-lime-500 text-white py-3 rounded-md hover:bg-lime-600 transition-colors font-semibold">
              Buy Ingredients
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipePage