import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.png';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Plus, Minus, Save } from 'lucide-react';
import Cookies from 'universal-cookie';

function RecipeBuilder() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userID = cookies.get('userID');
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    steps: [],  
    ingredients: [],
    authorID: userID
  });

  // Fetch available ingredients on component mount
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/Ingredients');
        const data = await response.json();
        const formattedIngredients = data.map(ingredient => ({
          value: ingredient.ingredientID,
          label: ingredient.name,
          costPerUnit: ingredient.costPerUnit
        }));
        setAvailableIngredients(formattedIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    if (!userID) {
      navigate('/login');
      return;
    }

    fetchIngredients();
  }, [userID, navigate]);

  const handleIngredientChange = (selectedOption, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = {
      ...selectedOption,
      quantity: newIngredients[index]?.quantity || 1
    };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleQuantityChange = (index, change) => {
    const newIngredients = [...recipe.ingredients];
    const newQuantity = Math.max(1, (newIngredients[index].quantity || 1) + change);
    newIngredients[index] = { ...newIngredients[index], quantity: newQuantity };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredientField = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, null] });
  };

  const removeIngredientField = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedSteps = recipe.steps
    .map((step, index) => `${index + 1}. ${step.charAt(0).toUpperCase() + step.slice(1)}.`)
    .join(" ");
    const recipeData = {
        "Title": recipe.title,
        "Description": recipe.description,
        "Steps": formattedSteps,
        "AuthorID": userID,
        "Ingredients": recipe.ingredients.map(ing => ({
            "IngredientID": ing.value,
            "Quantity": ing.quantity
        })),
        "Images": []
    }
    // console.log(recipeData);
    try {
      const response = await fetch('/api/Recipe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData)
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/recipe/${data.recipeID}`);
      } else {
        throw new Error('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe. Please try again.');
    }
  };

  const calculateTotalPrice = () => {
    return recipe.ingredients
      .reduce((total, ing) => total + (ing?.quantity || 0) * (ing?.costPerUnit || 0), 0)
      .toFixed(2);
  };

  return (
    <div className="flex-1 bg-[#faf9fb]">
      <div className="h-96 w-full relative">
        <img 
          src={Background}
          alt="Recipe Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
          <input
            type="text"
            placeholder="Recipe Title"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="text-4xl font-bold text-white bg-transparent border-b border-white/50 focus:outline-none focus:border-white w-full"
          />
          <textarea
            placeholder="Recipe Description"
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className="text-white/80 mt-2 bg-transparent border-b border-white/50 focus:outline-none focus:border-white w-full resize-none"
          />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Ingredients</h2>
                <button
                  onClick={addIngredientField}
                  className="btn btn-circle btn-sm bg-lime-500 text-white hover:bg-lime-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Select
                      options={availableIngredients}
                      value={ingredient}
                      onChange={(option) => handleIngredientChange(option, index)}
                      className="flex-1"
                      placeholder="Select ingredient..."
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="btn btn-circle btn-sm bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{ingredient?.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="btn btn-circle btn-sm bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeIngredientField(index)}
                      className="btn btn-circle btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <div className="flex flex-col gap-4">
                {(recipe.steps || []).map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="bg-lime-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...recipe.steps];
                          newSteps[index] = e.target.value;
                          setRecipe({ ...recipe, steps: newSteps });
                        }}
                        placeholder={`Step ${index + 1}...`}
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newSteps = recipe.steps.filter((_, i) => i !== index);
                        setRecipe({ ...recipe, steps: newSteps });
                      }}
                      className="btn btn-circle btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newSteps = [...(recipe.steps || []), ''];
                    setRecipe({ ...recipe, steps: newSteps });
                  }}
                  className="btn btn-circle btn-sm self-start bg-lime-500 text-white hover:bg-lime-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="text-2xl font-bold mb-2">Total Price</div>
            <div className="text-3xl font-bold text-lime-600 mb-4">
              ${calculateTotalPrice()}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!recipe.title || !recipe.description || recipe.ingredients.length === 0 || !recipe.steps?.length || recipe.steps.some(step => !step.trim())}
              className={`w-full py-3 rounded-md transition-colors font-semibold flex items-center justify-center gap-2 ${!recipe.title || !recipe.description || recipe.ingredients.length === 0 || !recipe.steps?.length || recipe.steps.some(step => !step.trim()) ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-500 hover:bg-lime-600 text-white'}`}
            >
              <Save size={20} />
              Save Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeBuilder;
