import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.png'
import axios from 'axios';
import Cookies from 'universal-cookie';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const cookies = new Cookies();
    const login = (token, userID) => {
        cookies.set('AuthToken', token);
        cookies.set('userID', userID);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {   
            const response = await fetch('/api/Users/Authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username": username, "password": password })
            });
            const data = await response.json();
            const token = data.token;
            const userID = data.userID;
            console.log('Login successful:', token);
            login(token, userID);
            navigate('/');
            window.location.reload();
            // Redirect to home page after successful login
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex-1 bg-[#faf9fb] flex items-center justify-center min-h-screen bg-cover bg-center" 
        style={{backgroundImage: `url(${Background})`}}>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!username || !password}
                        className={`text-white py-2 rounded-md transition-colors font-semibold ${
                            !username || !password 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-lime-500 hover:bg-lime-600'
                        }`}
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-lime-500 hover:text-lime-600 font-semibold"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
