import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Background from '../assets/Background.png'
import Cookies from 'universal-cookie';

function RecipePage() {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const userID = cookies.get('userID');

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userID) return;
      
      try {
        const response = await fetch(`/api/Users/order/${userID}`);
        const data = await response.json();
        setUserInfo(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userID]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/Recipe/${recipeID}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeID]); // Add recipeID as dependency

  if (loading) {
    return (
      <div className="flex-1 bg-[#faf9fb] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex-1 bg-[#faf9fb] flex items-center justify-center">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#faf9fb]">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="h-96 w-full relative">
            <img 
              src={Background}//{recipe.Images[0].ImageUrl} 
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
                            (${ingredient.costPerUnit} per {ingredient.quantity})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                  <div className="flex flex-col gap-4">
                    {recipe.steps && recipe.steps.split('. ')
                      .filter(step => step && !(/^\d+$/.test(step)))
                      .map((step, index) => (
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
                  ${recipe.ingredients && recipe.ingredients.reduce((total, ing) => total + (ing.quantity || 0) * ing.costPerUnit, 0).toFixed(2)}
                </div>
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary w-full bg-lime-500 text-white py-3 rounded-md hover:bg-lime-600 transition-colors font-semibold cursor-pointer text-center">
                  Buy Ingredients
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu p-4 w-96 min-h-full bg-white text-base-content">
            <h2 className="text-2xl font-bold mb-6">Order Preview</h2>
            
            <div className="flex flex-col gap-4 mb-6">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.ingredientID} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{ingredient.name}</p>
                    <p className="text-sm text-gray-600">${ingredient.costPerUnit} per {ingredient.quantity}</p>
                  </div>
                  <p className="font-semibold">${(ingredient.quantity * ingredient.costPerUnit).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold text-lime-600">
                  ${recipe.ingredients.reduce((total, ing) => total + (ing.quantity || 0) * ing.costPerUnit, 0).toFixed(2)}
                </p>
              </div>
              
              {userID ? (
                <>
                  <div className="mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">Card Holder</p>
                        <p className="font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600">Card Number</p>
                        <p className="font-semibold">{userInfo.creditCardNumber}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-lime-500 text-white py-3 rounded-md hover:bg-lime-600 transition-colors font-semibold">
                    Place Order
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full bg-lime-500 text-white py-3 rounded-md hover:bg-lime-600 transition-colors font-semibold"
                >
                  Login to Buy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipePage