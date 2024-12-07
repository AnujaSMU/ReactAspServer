import { ForkKnife } from 'lucide-react'
import React from 'react'

const RecipeCard = ({recipe}) => {
return ( 
    <div className='flex flex-col bg-white shadow-md overflow-hidden rounded-lg p-4 relative transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 hover:z-10'>
            <a href={`/recipe/${recipe.RecipeID}`} className="relative h-32">
            <img src={recipe.Images[0].ImageUrl} alt="" className='w-full h-full object-cover cursor-pointer rounded-lg'/>
            </a>

            <div className='flex mt-1'>
                    <p className="font-bold tracking-wide">{recipe.Title}</p>
            </div>

            <p className="my-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs hover:whitespace-normal hover:text-ellipsis hover:max-w-none">
                {recipe.Description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
                    {recipe.Ingredients.slice(0, recipe.Ingredients.length).map((ingredient, index) => (
                        <div key={index} className={`flex gap-1 bg-lime-300 items-center p-1 rounded-md ${index >= 3 ? 'hidden group-hover:flex' : ''}`}>
                            <ForkKnife size={16} />
                            <span className="text-sm tracking-tighter font-semibold">{ingredient.Name}</span>
                        </div>
                    ))}
            </div>
    </div>
)
};

export default RecipeCard