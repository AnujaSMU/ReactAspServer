import { ForkKnife, HeartPulse, Search } from "lucide-react";
import React from 'react'
import { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import RecipeCard from "../components/RecipeCard";
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const animatedComponents = makeAnimated();
const HomePage = () => {
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
                    
                    <RecipeCard />
                </div>    
            </div>
    </div>
    )
}

export default HomePage