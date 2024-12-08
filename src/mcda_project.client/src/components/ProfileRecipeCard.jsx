import { ForkKnife, Trash2 } from 'lucide-react'
import React from 'react'

const ProfileRecipeCard = ({recipe}) => {
return ( 
    <div className='flex flex-col bg-white shadow-md overflow-hidden rounded-lg p-4 relative transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 hover:z-10'>
            <div className="relative h-32 group">
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        if(window.confirm('Are you sure you want to delete this recipe?')) {
                            fetch(`/api/Recipe/delete/${recipe.recipeID}`, {
                                method: 'DELETE'
                            }).then(response => {
                                if (response.ok) {
                                    window.location.reload();
                                } else {
                                    alert('Failed to delete recipe');
                                }
                            }).catch(error => {
                                console.error('Error:', error);
                                alert('Error deleting recipe');
                            });
                        }
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                >
                    <Trash2 size={24} />
                </button>
                <a href={`/recipe/${recipe.recipeID}`}>
                    {/* <img src={recipe.Images[0].ImageUrl} alt="" className='w-full h-full object-cover cursor-pointer rounded-lg'/> */}
                    <img src="https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755"alt="" className='w-full h-full object-cover cursor-pointer rounded-lg'/>
                </a>
            </div>

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

export default ProfileRecipeCard