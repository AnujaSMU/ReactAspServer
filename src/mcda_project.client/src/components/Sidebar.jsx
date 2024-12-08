import React from 'react'
import { Link } from 'react-router-dom'
import { User, Home } from "lucide-react";
const Sidebar = () => {
  return (<>
    <div className='p-3 md:p-10 border-r min-h-screen w-24 md:w-64'>
        <div className='flex flex-col gap-20 sticky top-10 left-0'>
            <div className='w-full'>
                <img src="/vite.svg" alt="" className='hidden md:block'/>

            </div>
            <ul className='flex flex-col items-center md:items-start gap-8'>
					<Link to={"/"} className='flex gap-1'>
						<Home size={"24"} />
						<span className='font-bold hidden md:block'>Home</span>
					</Link>
					<Link to={"/profile"} className='flex gap-1'>
                    <User size={"24"} />
						<span className='font-bold hidden md:block'>Profile</span>
					</Link>
                <Link to={"/login"} className='flex gap-1'>
                    <User size={"24"} />
                    <span className='font-bold hidden md:block'>Login</span>
                </Link>
				</ul>
        </div>
    </div>
  </>);
    
  
};

export default Sidebar