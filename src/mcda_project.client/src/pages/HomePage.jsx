import React, { useState, useEffect } from 'react'
import { ForkKnife, HeartPulse, Search } from "lucide-react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import RecipeCard from "../components/RecipeCard";
const options = [
  { value: 'pasta', label: 'Pasta' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'vanilla', label: 'Vanilla' }
]
const animatedComponents = makeAnimated();
const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchRecipes = async (query) => {
        setLoading(true);
        setRecipes([]);
        try {
            //const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=''&query=${query}`);
            //const data = await response.json();
            const data = {
            results: [
                {
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
                },
                {
                    "RecipeID": 2,
                    "Title": "Chicken Alfredo",
                    "Description": "Creamy and delicious chicken Alfredo",
                    "Steps": "1. Cook pasta\n2. Cook chicken\n3. Mix cream and cheese\n4. Combine all ingredients",
                    "AuthorID": 123,
                    "Views": 1000,
                     "Ingredients": [
                        {
                            "IngredientID": 4,
                            "Name": "Chicken",
                            "CostPerUnit": 5.99,
                            "Unit": "Lb"
                        },
                    ],
                    "Images": [
                      {
                        "ImageID": 2,
                        "ImageUrl": "https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755"
                      },
                    ]
                }
            ]
        };
            setRecipes(data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoading(false);
        } finally {
            // setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecipes("pasta");
    }, []);
return (
    <div className='bg-[#faf9fb] p-10 flex-1'>
            <div className='max-w-screen-lg mx-auto'>
                <form action="">
                    <label className='input shadow-md flex items-center gap-2'>
                    <Search size={"24"} />
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            isMulti
                            options={options}
                            placeholder="What do you want to cook today?"
                            styles={{
                                container: (provided) => ({ ...provided, flex: 1 }),
                                control: (provided) => ({ ...provided, border: 'none', boxShadow: 'none' }),
                                dropdownIndicator: (provided) => ({ ...provided, display: 'none' }),
                                indicatorSeparator: (provided) => ({ ...provided, display: 'none' })
                            }}
                            />
                    </label>
                </form>
                <p className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</p>
				<p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {!loading && recipes.map((recipe) => (
                    <RecipeCard key={recipe.RecipeID} recipe={recipe} />
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