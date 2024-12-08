import React, { useState, useEffect } from 'react'
import { ForkKnife, HeartPulse, Search } from "lucide-react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    //const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch('/api/Ingredients');
                const data = await response.json();
                const formattedIngredients = data.map(ingredient => ({
                    value: ingredient.ingredientID,
                    label: ingredient.name
                }));
                setIngredients(formattedIngredients);
              //  setOptions(formattedIngredients);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    const animatedComponents = makeAnimated();

    const fetchRecipes = async (searchIngredients) => {
        setLoading(true);
        setRecipes([]);
        try {
            const response = await fetch(`/api/RecipeSearch/FindByIngredients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(searchIngredients) // This should be replaced with actual ingredient IDs
            });
            const data = await response.json();
            console.log(data);
            setRecipes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const fetchTrending = async () => {
        try {
            const response = await fetch('/api/Recipe/trending-recipes');
            const data = await response.json();
            // const data = {
            //     results: [
            //         {
            //             "recipeID": 1,
            //             "title": "Spaghetti Carbonara",
            //             "description": "Classic Italian pasta dish",
            //             "steps": "1. Boil pasta\n2. Cook pancetta\n3. Mix eggs and cheese\n4. Combine all ingredients",
            //             "authorID": 123,
            //             "views": 1500,
            //             "ingredients": [
            //                 {
            //                     "ingredientID": 1,
            //                     "name": "Spaghetti",
            //                     "costPerUnit": 2.99,
            //                     "unit": "Lb"
            //                 },
            //                 {
            //                     "ingredientID": 2,
            //                     "name": "Eggs",
            //                     "costPerUnit": 1.50,
            //                     "unit": "piece"
            //                 },
            //                 {
            //                     "ingredientID": 3,
            //                     "name": "Tomato",
            //                     "costPerUnit": 0.50,
            //                     "unit": "piece"
            //                 },
            //                 {
            //                     "ingredientID": 4,
            //                     "name": "Chicken",
            //                     "costPerUnit": 5.99,
            //                     "unit": "Lb"
            //                 }
            //             ],
            //             "images": [
            //                 {
            //                     "imageID": 1,
            //                     "ImageUrl": "https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755"
            //                 }
            //             ]
            //         },
            //         {
            //             "recipeID": 2,
            //             "title": "Chicken Alfredo",
            //             "description": "Creamy and delicious chicken Alfredo",
            //             "steps": "1. Cook pasta\n2. Cook chicken\n3. Mix cream and cheese\n4. Combine all ingredients",
            //             "authorID": 123,
            //             "views": 1000,
            //             "ingredients": [
            //                 {
            //                     "ingredientID": 4,
            //                     "name": "Chicken",
            //                     "costPerUnit": 5.99,
            //                     "unit": "Lb"
            //                 },
            //             ],
            //             "images": [
            //                 {
            //                     "imageID": 2,
            //                     "imageUrl": "https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755"
            //                 },
            //             ]
            //         }
            //     ]
            // };
            setRecipes(data);
            //setRecipes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trending recipes:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrending();
        //fetchRecipes([1,2,3,4]);
    }, []);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleIngredientChange = (selected) => {
        setSelectedIngredients(selected);
    };

    const handleSearchRecipe = (e) => {
        e.preventDefault();
        // Use selectedIngredients state directly instead of trying to access form value
        const selectedIngredientIds = selectedIngredients.map(ing => ing.value);
        console.log("Searching with ingredients:", selectedIngredientIds);
        fetchRecipes(selectedIngredientIds);
    };

    return (
        <div className='bg-[#faf9fb] p-10 flex-1'>
            <div className='max-w-screen-lg mx-auto'>
                <form onSubmit={handleSearchRecipe} className="flex gap-2">
                    <label className='input shadow-md flex items-center gap-2 flex-1'>
                        <Search size={"24"} />
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            isMulti
                            options={ingredients}
                            onChange={handleIngredientChange}
                            value={selectedIngredients}
                            placeholder="What do you want to cook today?"
                            styles={{
                                container: (provided) => ({ ...provided, flex: 1 }),
                                control: (provided) => ({ ...provided, border: 'none', boxShadow: 'none' }),
                                dropdownIndicator: (provided) => ({ ...provided, display: 'none' }),
                                indicatorSeparator: (provided) => ({ ...provided, display: 'none' })
                            }}
                        />
                    </label>
                    {selectedIngredients.length > 0 && (
                        <button type="submit" className="bg-lime-500 hover:bg-lime-600 text-white px-6 rounded-lg shadow-md transition-colors">
                            Search
                        </button>
                    )}
                </form>
                <p className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</p>
                <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {!loading && Array.isArray(recipes) && recipes.map((recipe) => (
                        <RecipeCard key={recipe.recipeID} recipe={recipe} />
                    ))}
                    {loading &&
                        [...Array(6)].map((_, index) => (
                            <div key={index} className='flex flex-col gap-4 w-full'>
                                <div className='skeleton h-32 w-full'></div>
                                <div className='flex justify-between'>
                                    <div className='skeleton h-4 w-28'></div>
                                    <div className='skeleton h-4 w-24'></div>
                                </div>
                                <div className='skeleton h-4 w-1/2'></div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage