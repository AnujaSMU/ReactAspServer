import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // TODO: Implement login logic here
        console.log('Login attempted with:', values);
    };

    return (
        <div className="flex-1 bg-[#faf9fb] flex items-center justify-center min-h-screen bg-cover bg-center" 
        style={{backgroundImage: "url('https://admin.sriboga.com/storage/news/1685519116-asian-cuisine-ingredients-food-background-ginger-2023-05-09-20-34-33-utc.webp')"}}>
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
                        className="bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition-colors font-semibold"
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
