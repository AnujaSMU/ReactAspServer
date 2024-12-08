import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/Background.png'
const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        city: '',
        provinceState: '',
        country: '',
        postalCode: '',
        phoneNumber: '',
        emailAddress: '',
        creditCardNumber: '',
        creditCardType: '',
        creditCardExpiry: ''
    });
    const [focus, setFocus] = useState(false);
    const usStates = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
        'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
        'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    const canadianProvinces = [
        'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'
    ];
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/Users/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                alert('Registration failed');
                throw new Error('Registration failed');
            }

            console.log('Signup attempted with:', formData);
            alert('Sign up successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex-1 bg-[#faf9fb] flex items-center justify-center p-8 min-h-screen bg-cover bg-center" 
        style={{backgroundImage: `url(${Background})`}}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* User Information Section */}
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">User Information</h2>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.username.match(/^[a-zA-Z0-9]{3,20}$/) && formData.username ? 'text-red-500' : 'text-gray-700'}`}>
                            Username
                        </label>
                        {!formData.username.match(/^[a-zA-Z0-9]{3,20}$/) && formData.username && (
                            <p className="text-red-500 text-xs mt-1 mb-2">
                                Username must be between 3-20 characters and can only contain letters and numbers
                            </p>
                        )}
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.username.match(/^[a-zA-Z0-9]{3,20}$/) && formData.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            minLength={3}
                            maxLength={20}
                            pattern="[a-zA-Z0-9]+"
                            title="Username must be between 3-20 characters and can only contain letters and numbers"
                        />
                    </div>

                    <div className="relative">
                        <label className={`block text-sm font-medium mb-1 ${!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && formData.password ? 'text-red-500' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) && formData.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            minLength={8}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title="Password must be at least 8 characters and include uppercase, lowercase, number and special character"
                            onFocus={() => { setFocus(true) }}
                            onBlur={() => { setFocus(false) }}
                        />
                        {formData.password && focus && (
                            <div className="absolute left-full ml-4 top-0 bg-white p-4 rounded-lg shadow-lg w-64">
                                <h4 className="font-medium mb-2">Password Requirements:</h4>
                                <ul className="text-sm space-y-1">
                                    <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className="mr-2">{formData.password.length >= 8 ? '✓' : '×'}</span>
                                        At least 8 characters
                                    </li>
                                    <li className={`flex items-center ${formData.password.match(/[A-Z]/) ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className="mr-2">{formData.password.match(/[A-Z]/) ? '✓' : '×'}</span>
                                        One uppercase letter
                                    </li>
                                    <li className={`flex items-center ${formData.password.match(/[a-z]/) ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className="mr-2">{formData.password.match(/[a-z]/) ? '✓' : '×'}</span>
                                        One lowercase letter
                                    </li>
                                    <li className={`flex items-center ${formData.password.match(/\d/) ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className="mr-2">{formData.password.match(/\d/) ? '✓' : '×'}</span>
                                        One number
                                    </li>
                                    <li className={`flex items-center ${formData.password.match(/[@$!%*?&]/) ? 'text-green-500' : 'text-red-500'}`}>
                                        <span className="mr-2">{formData.password.match(/[@$!%*?&]/) ? '✓' : '×'}</span>
                                        One special character
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.firstName.match(/^[A-Za-z\s]+$/) && formData.firstName ? 'text-red-500' : 'text-gray-700'}`}>
                            First Name
                        </label>
                        {!formData.firstName.match(/^[A-Za-z\s]+$/) && formData.firstName && (
                            <p className="text-sm text-red-500 mt-1">Please enter a valid first name (letters only)</p>
                        )}
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.firstName.match(/^[A-Za-z\s]+$/) && formData.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern="[A-Za-z\s]+"
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.lastName.match(/^[A-Za-z\s]+$/) && formData.lastName ? 'text-red-500' : 'text-gray-700'}`}>
                            Last Name
                        </label>
                        {!formData.lastName.match(/^[A-Za-z\s]+$/) && formData.lastName && (
                            <p className="text-sm text-red-500 mt-1">Please enter a valid last name (letters only)</p>
                        )}
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.lastName.match(/^[A-Za-z\s]+$/) && formData.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern="[A-Za-z\s]+"
                            title="Please enter a valid last name (letters only)"
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.city.match(/^[A-Za-z\s]+$/) && formData.city ? 'text-red-500' : 'text-gray-700'}`}>
                            City
                        </label>
                        {!formData.city.match(/^[A-Za-z\s]+$/) && formData.city && (
                            <p className="text-sm text-red-500 mt-1">Please enter a valid city name (letters only)</p>
                        )}
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.city.match(/^[A-Za-z\s]+$/) && formData.city ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern="[A-Za-z\s]+"
                            title="Please enter a valid city name (letters only)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Province/State
                        </label>
                        <select
                            name="provinceState"
                            value={formData.provinceState}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        >
                            <option value="">Select a Province/State</option>
                            {formData.country === "Canada" ? (
                                canadianProvinces.map(province => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))
                            ) : (
                                usStates.map(state => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.country && formData.country !== '' ? 'text-red-500' : 'text-gray-700'}`}>
                            Country
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.country && formData.country !== '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                        >
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            
                        </select>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.postalCode.match(formData.country === "USA" ? /^[0-9]{5}(?:-[0-9]{4})?$/ : /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/) && formData.postalCode ? 'text-red-500' : 'text-gray-700'}`}>
                            Postal Code
                        </label>
                        {!formData.postalCode.match(formData.country === "USA" ? /^[0-9]{5}(?:-[0-9]{4})?$/ : /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/) && formData.postalCode && (
                            <p className="text-sm text-red-500 mt-1">Please enter a valid postal code</p>
                        )}
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.postalCode.match(formData.country === "USA" ? /^[0-9]{5}(?:-[0-9]{4})?$/ : /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/) && formData.postalCode ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern={formData.country === "USA" ? "^[0-9]{5}(?:-[0-9]{4})?$" : "^[A-Za-z][0-9][A-Za-z]\\s?[0-9][A-Za-z][0-9]$"}
                            title={formData.country === "USA" ? "Please enter a valid US ZIP code (e.g. 12345 or 12345-6789)" : "Please enter a valid Canadian postal code (e.g. A1A 1A1)"}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.phoneNumber.match(/^\+?1?[2-9][0-9]{2}[2-9][0-9]{6}$/) && formData.phoneNumber ? 'text-red-500' : 'text-gray-700'}`}>
                            Phone Number
                        </label>
                        {!formData.phoneNumber.match(/^\+?1?[2-9][0-9]{2}[2-9][0-9]{6}$/) && formData.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1 mb-2">
                                Please enter a valid US/Canadian phone number (e.g. +12125551234)
                            </p>
                        )}
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.phoneNumber.match(/^\+?1?[2-9][0-9]{2}[2-9][0-9]{6}$/) && formData.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern="^\+?1?[2-9][0-9]{2}[2-9][0-9]{6}$"
                            title="Please enter a valid US/Canadian phone number (e.g. 2125551234)"
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.emailAddress.match(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/) && formData.emailAddress ? 'text-red-500' : 'text-gray-700'}`}>
                            Email Address
                        </label>
                        {!formData.emailAddress.match(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/) && formData.emailAddress && (
                            <p className="text-red-500 text-xs mt-1 mb-2">
                                Please enter a valid email address
                            </p>
                        )}
                        <input
                            type="email" 
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.emailAddress.match(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/) && formData.emailAddress ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern="^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address"
                        />
                    </div>

                    {/* Payment Details Section */}
                    <div className="md:col-span-2 mt-8">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.creditCardNumber ? 'text-red-500' : 'text-gray-700'}`}>
                            Credit Card Number
                        </label>
                        {!formData.creditCardNumber.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/) && formData.creditCardNumber && (
                            <p className="text-red-500 text-xs mt-1 mb-2">
                                Please enter a valid credit card number (16 digits for Visa/Mastercard, 15 for American Express)
                            </p>
                        )}
                        <input
                            type="text"
                            name="creditCardNumber"
                            value={formData.creditCardNumber}
                            onChange={(e) => {
                                handleChange(e);
                                const number = e.target.value;
                                let type = '';
                                if (number.startsWith('4')) {
                                    type = 'Visa';
                                } else if (number.startsWith('5')) {
                                    type = 'Mastercard';
                                } else if (number.startsWith('34') || number.startsWith('37')) {
                                    type = 'American Express';
                                }
                                setFormData(prev => ({
                                    ...prev,
                                    creditCardType: type
                                }));
                            }}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.creditCardNumber.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/) && formData.creditCardNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                            pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$"
                            title="Please enter a valid credit card number (16 digits for Visa/Mastercard, 15 for American Express)"
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.creditCardType && formData.creditCardType !== '' ? 'text-red-500' : 'text-gray-700'}`}>
                            Credit Card Type
                        </label>
                        <select
                            name="creditCardType"
                            value={formData.creditCardType}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${!formData.creditCardType && formData.creditCardType !== '' ? 'border-red-500 focus:ring-red-500' : 'focus:ring-lime-500'}`}
                            required
                        >
                            <option value="">Select card type</option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="American Express">American Express</option>
                        </select>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-1 ${!formData.creditCardExpiry && formData.creditCardExpiry !== '' ? 'text-red-500' : 'text-gray-700'}`}>
                            Credit Card Expiry
                        </label>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <select
                                    value={formData.creditCardExpiry ? formData.creditCardExpiry.split('/')[0] : ''}
                                    onChange={(e) => {
                                        const month = e.target.value;
                                        const year = formData.creditCardExpiry ? formData.creditCardExpiry.split('/')[1] : '';
                                        setFormData(prev => ({
                                            ...prev,
                                            creditCardExpiry: year ? `${month}/${year}` : month
                                        }));
                                    }}
                                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        (!formData.creditCardExpiry && formData.creditCardExpiry !== '') || 
                                        (formData.creditCardExpiry && new Date() > new Date(formData.creditCardExpiry.split('/')[1], formData.creditCardExpiry.split('/')[0])) 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'focus:ring-lime-500'
                                    }`}
                                    required
                                >
                                    <option value="">Month</option>
                                    {Array.from({length: 12}, (_, i) => {
                                        const month = (i + 1).toString().padStart(2, '0');
                                        return (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <span className="flex items-center">/</span>
                            <div className="w-1/2">
                                <select
                                    value={formData.creditCardExpiry ? formData.creditCardExpiry.split('/')[1] : ''}
                                    onChange={(e) => {
                                        const year = e.target.value;
                                        const month = formData.creditCardExpiry ? formData.creditCardExpiry.split('/')[0] : '';
                                        setFormData(prev => ({
                                            ...prev,
                                            creditCardExpiry: month ? `${month}/${year}` : year
                                        }));
                                    }}
                                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        (!formData.creditCardExpiry && formData.creditCardExpiry !== '') || 
                                        (formData.creditCardExpiry && new Date() > new Date(formData.creditCardExpiry.split('/')[1], formData.creditCardExpiry.split('/')[0])) 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'focus:ring-lime-500'
                                    }`}
                                    required
                                >
                                    <option value="">Year</option>
                                    {Array.from({length: 16}, (_, i) => {
                                        const year = (2016 + i).toString();
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        {formData.creditCardExpiry && new Date() > new Date(formData.creditCardExpiry.split('/')[1], formData.creditCardExpiry.split('/')[0]) && (
                            <p className="text-red-500 text-sm mt-1">This card has expired. Please enter a valid expiration date.</p>
                        )}
                    </div>

                    <div className="md:col-span-2 mt-8">
                        <button
                            type="submit"
                            className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition-colors font-semibold"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-lime-500 hover:text-lime-600 font-semibold"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
