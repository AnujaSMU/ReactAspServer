import React, { useState, useEffect } from 'react';
import background from '../assets/Background.png';
import ProfileRecipeCard from '../components/ProfileRecipeCard';
import  Cookies  from 'universal-cookie';

const cookies = new Cookies();
const userID = cookies.get('userID');

const ProfilePage = () => {
    // State to hold user data
    const [userData, setUserData] = useState({
        UserID: 1,
        username: 'chefmaster',
        firstName: 'John',
        lastName: 'Doe',
        city: 'Halifax',
        provinceState: 'Nova Scotia',
        country: 'Canada',
        postalCode: 'B3J1A1',
        phoneNumber: '+19025551234',
        emailAddress: 'john.doe@example.com',
        recipes: [
            {
              "recipeID": 43,
              "title": "Pumpkin Pie",
              "ingredients": [
                {
                  "ingredientID": 20,
                  "name": "Lettuce"
                },
                {
                  "ingredientID": 32,
                  "name": "Apple"
                },
                {
                  "ingredientID": 38,
                  "name": "Blackberries"
                },
                {
                  "ingredientID": 16,
                  "name": "Milk"
                }
              ]
            }
        ]

    });
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                
                
                if (!userID) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(`/api/Users/${userID}/details`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    return (
        <div className="container mx-auto p-8">
            <div className="w-full h-48 mb-8 rounded-lg overflow-hidden">
                <img 
                    src={background} 
                    alt="Profile Banner" 
                    className="w-full h-full object-cover"
                />
            </div>
            <h1 className="text-3xl font-bold mb-8">Welcome, {userData.username}!</h1>
            
            
            <div role="tablist" className="tabs tabs-lifted">
            <input 
                    type="radio" 
                    name="profile_tabs" 
                    role="tab" 
                    className="tab" 
                    aria-label="My Recipes"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userData.recipes.map((recipe, index) => (
                            <ProfileRecipeCard key={index} recipe={recipe} />
                        ))}
                        <div className='flex flex-col bg-white shadow-md overflow-hidden rounded-lg p-4 relative transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 hover:z-10 h-full'>
                            <a href="/recipe/new" className="flex items-center justify-center h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <input 
                    type="radio" 
                    name="profile_tabs" 
                    role="tab" 
                    className="tab" 
                    aria-label="Personal Information"
                    
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                            <input 
                                type="text"
                                value={userData.firstName}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                            <input 
                                type="text"
                                value={userData.lastName}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input 
                                type="email"
                                value={userData.emailAddress}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input 
                                type="tel"
                                value={userData.phoneNumber}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                        <input 
                            type="text"
                            value={userData.city}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Province/State</label>
                        <input 
                            type="text"
                            value={userData.provinceState}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                        <input 
                            type="text"
                            value={userData.country}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                        <input 
                            type="text"
                            value={userData.postalCode}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                </div>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save Changes
                </button>
            </div>
            </div>
            </div>

            
        </div>
    );
};

export default ProfilePage;