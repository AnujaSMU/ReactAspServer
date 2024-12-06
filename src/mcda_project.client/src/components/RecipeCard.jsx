import { ForkKnife } from 'lucide-react'
import React from 'react'

const RecipeCard = () => {
  return (
    <div className='flex flex-col bg-white shadow-md overflow-hidden rounded-lg p-4 relative'>
        <a href="#" className="relative h-32">
        <img src="https://static.wikia.nocookie.net/da7f4324-f6f9-4ae7-91f9-9680eac4cb64/scale-to-width/755" alt="" className='w-full h-full object-cover cursor-pointer rounded-lg'/>
        </a>

        <div className='flex mt-1'>
            <p className="font-bold tracking-wide">Pasta</p>
        </div>

        <p className="my-2">Fast Pasta</p>
        <div className="flex gap-2 mt-auto">
            <div className="flex gap-1 bg-lime-300 items-center p-1 rounded-md">
                <ForkKnife size={16} />
                <span className="text-sm tracking-tighter font-semibold">Pasta</span>
            </div>
            <div className="flex gap-1 bg-lime-300 items-center p-1 rounded-md">
                <ForkKnife size={16} />
                <span className="text-sm tracking-tighter font-semibold">Tomato</span>
            </div>
        </div>
    </div>
  )
}

export default RecipeCard