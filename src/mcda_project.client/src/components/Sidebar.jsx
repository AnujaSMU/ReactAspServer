import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Home, LogOut ,LogIn } from "lucide-react";

import Cookies from 'universal-cookie';

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get('AuthToken');
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    cookies.remove('AuthToken');
    cookies.remove('userID');
    setIsLoggedIn(false);
    navigate('/login');
  };

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
                {isLoggedIn ? (
                    <Link to={"/profile"} className='flex gap-1'>
                        <User size={"24"} />
                        <span className='font-bold hidden md:block'>Profile</span>
                    </Link>
                ) : ( <div  className='flex flex-col gap-8'>
                    <Link to={"/signup"} className='flex gap-1'>
                        <User size={"24"} />
                        <span className='font-bold hidden md:block'>Sign Up</span>
                    </Link>
                    <Link to={"/login"} className='flex gap-2'>
                        <LogIn size={"24"} />
                        <span className='font-bold hidden md:block'>Login</span>
                    </Link>
                    </div>
                )}
                {isLoggedIn && (
                    <button onClick={logout} className='flex gap-1 text-red-600 hover:text-red-700'>
                        <LogOut size={"24"} />
                        <span className='font-bold hidden md:block'>Logout</span>
                    </button>
                )}
            </ul>
        </div>
    </div>
  </>);
};

export default Sidebar