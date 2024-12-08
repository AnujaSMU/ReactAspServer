import { ForkKnife } from 'lucide-react'
import React from 'react'

const RecipeCard = ({recipe}) => {
return ( 
    <div className='flex flex-col bg-white shadow-md overflow-hidden rounded-lg p-4 relative transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 hover:z-10'>
            <a href={`/recipe/${recipe.recipeID}`} className="relative h-32">
            {/* <img src={recipe.Images[0].ImageUrl} alt="" className='w-full h-full object-cover cursor-pointer rounded-lg'/> */}
            <img src="https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755"alt="" className='w-full h-full object-cover cursor-pointer rounded-lg'/>
            </a>

            <div className='flex mt-1'>
                    <p className="font-bold tracking-wide">{recipe.title}</p>
            </div>

            <p className="my-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs hover:whitespace-normal hover:text-ellipsis hover:max-w-none">
                {recipe.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto group">
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className={`flex gap-1 bg-lime-300 items-center p-1 rounded-md w-fit ${index >= 4 ? 'hidden group-hover:block' : ''}`}>
                            <ForkKnife size={16} />
                            <span className="text-sm tracking-tighter font-semibold">{ingredient.name}</span>
                        </div>
                    ))}
            </div>
    </div>
)
};

export default RecipeCard