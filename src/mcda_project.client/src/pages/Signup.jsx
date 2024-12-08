import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // 确保你有一个对应的 CSS 文件

const SignUp = ({ onSignUp }) => {
    const [userData, setUserData] = useState({
        Username: '',
        PasswordHash: '',
        FirstName: '',
        LastName: '',
        City: '',
        ProvinceState: '',
        Country: '',
        PostalCode: '',
        PhoneNumber: '',
        EmailAddress: '',
        CreditCardNumber: '',
        CreditCardType: '',
        CreditCardExpiry: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateName = (name) => {
        const invalidChars = /[;:!@#$%^&*+?\\/<>1234567890]/;
        return !invalidChars.test(name);
    };

    const validatePostalCode = (postalCode, country) => {
        if (country === 'Canada') {
            return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
        } else if (country === 'USA') {
            return /^\d{5}(-\d{4})?$/.test(postalCode);
        }
        return true;
    };

    const validatePhoneNumber = (phoneNumber, country) => {
        if (country === 'Canada' || country === 'USA') {
            return /^\+1\d{10}$/.test(phoneNumber);
        }
        return true;
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateCreditCardNumber = (creditCardNumber, creditCardType) => {
        const cardTypeRules = {
            MasterCard: { prefix: /^5[1-5]/, length: 16 },
            Visa: { prefix: /^4/, length: 16 },
            'American Express': { prefix: /^3[47]/, length: 15 },
        };
        const rule = cardTypeRules[creditCardType];

        // Check if the credit card number consists of digits only
        if (!/^\d+$/.test(creditCardNumber)) {
            return false;
        }

        return rule && rule.prefix.test(creditCardNumber) && creditCardNumber.length === rule.length;
    };

    const validateExpiryDate = (expiryDate) => {
        const match = expiryDate.match(/^(\d{4})-(\d{2})$/);
        if (match) {
            const [, year, month] = match;
            return (
                parseInt(month, 10) >= 1 &&
                parseInt(month, 10) <= 12 &&
                parseInt(year, 10) >= 2016 &&
                parseInt(year, 10) <= 2031
            );
        }
        return false;
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if all fields are entered
        if (!userData.FirstName) newErrors.FirstName = 'First name is required';
        if (!userData.LastName) newErrors.LastName = 'Last name is required';
        if (!userData.City) newErrors.City = 'City is required';
        if (!userData.ProvinceState) newErrors.ProvinceState = 'Province/State is required';
        if (!userData.Country) newErrors.Country = 'Country is required';
        if (!userData.PostalCode) newErrors.PostalCode = 'Postal code is required';
        if (!userData.PhoneNumber) newErrors.PhoneNumber = 'Phone number is required';
        if (!userData.EmailAddress) newErrors.EmailAddress = 'Email address is required';
        if (!userData.CreditCardNumber) newErrors.CreditCardNumber = 'Credit card number is required';
        if (!userData.CreditCardType) newErrors.CreditCardType = 'Credit card type is required';
        if (!userData.CreditCardExpiry) newErrors.CreditCardExpiry = 'Credit card expiry date is required';
        if (!userData.PasswordHash) newErrors.PasswordHash = 'Password is required';
        if (userData.PasswordHash !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        // Validate specific fields
        if (!validateName(userData.FirstName)) newErrors.FirstName = 'Invalid characters';
        if (!validateName(userData.LastName)) newErrors.LastName = 'Invalid characters';
        if (!validateName(userData.City)) newErrors.City = 'Invalid characters';
        if (!validateName(userData.ProvinceState)) newErrors.ProvinceState = 'Invalid characters';
        if (!validatePostalCode(userData.PostalCode, userData.Country)) newErrors.PostalCode = 'Invalid postal code';
        if (!validatePhoneNumber(userData.PhoneNumber, userData.Country)) newErrors.PhoneNumber = 'Invalid phone number';
        if (!validateEmail(userData.EmailAddress)) newErrors.EmailAddress = 'Invalid email address';
        if (!validateCreditCardNumber(userData.CreditCardNumber, userData.CreditCardType)) newErrors.CreditCardNumber = 'Invalid credit card number';
        if (!validateExpiryDate(userData.CreditCardExpiry)) newErrors.CreditCardExpiry = 'Invalid expiry date';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = () => {
        if (validateForm()) {
            // Simulated sign-up process
            onSignUp(userData);
            setSuccessMessage('Sign up successful! Redirecting to profile...');
            setTimeout(() => {
                navigate('/profile');
            }, 2000); // Redirect after 2 seconds
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={userData.Username}
                        onChange={(e) => setUserData({...userData, Username: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={userData.FirstName}
                        onChange={(e) => setUserData({...userData, FirstName: e.target.value})}
                    />
                    {errors.FirstName && <div className="error-message">{errors.FirstName}</div>}
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={userData.LastName}
                        onChange={(e) => setUserData({...userData, LastName: e.target.value})}
                    />
                    {errors.LastName && <div className="error-message">{errors.LastName}</div>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={userData.PasswordHash}
                            onChange={(e) => setUserData({...userData, PasswordHash: e.target.value})}
                        />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    {errors.PasswordHash && <div className="error-message">{errors.PasswordHash}</div>}
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <div className="password-input">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        value={userData.City}
                        onChange={(e) => setUserData({...userData, City: e.target.value})}
                    />
                    {errors.City && <div className="error-message">{errors.City}</div>}
                </div>
                <div className="form-group">
                    <label>Province/State:</label>
                    <input
                        type="text"
                        value={userData.ProvinceState}
                        onChange={(e) => setUserData({...userData, ProvinceState: e.target.value})}
                    />
                    {errors.ProvinceState && <div className="error-message">{errors.ProvinceState}</div>}
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <input
                        type="text"
                        value={userData.Country}
                        onChange={(e) => setUserData({...userData, Country: e.target.value})}
                    />
                    {errors.Country && <div className="error-message">{errors.Country}</div>}
                </div>
                <div className="form-group">
                    <label>Postal Code:</label>
                    <input
                        type="text"
                        value={userData.PostalCode}
                        onChange={(e) => setUserData({...userData, PostalCode: e.target.value})}
                    />
                    {errors.PostalCode && <div className="error-message">{errors.PostalCode}</div>}
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={userData.PhoneNumber}
                        onChange={(e) => setUserData({...userData, PhoneNumber: e.target.value})}
                    />
                    {errors.PhoneNumber && <div className="error-message">{errors.PhoneNumber}</div>}
                </div>
                <div className="form-group">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        value={userData.EmailAddress}
                        onChange={(e) => setUserData({...userData, EmailAddress: e.target.value})}
                    />
                    {errors.EmailAddress && <div className="error-message">{errors.EmailAddress}</div>}
                </div>
                <div className="form-group">
                    <label>Credit Card Number:</label>
                    <input
                        type="text"
                        value={userData.CreditCardNumber}
                        onChange={(e) => setUserData({...userData, CreditCardNumber: e.target.value})}
                    />
                    {errors.CreditCardNumber && <div className="error-message">{errors.CreditCardNumber}</div>}
                </div>
                <div className="form-group">
                    <label>Credit Card Type:</label>
                    <select
                        type="text"
                        value={userData.CreditCardType}
                        onChange={(e) => setUserData({...userData, CreditCardType: e.target.value})}
                    >
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                </select>
                {errors.CreditCardType && <div className="error-message">{errors.CreditCardType}</div>}
            </div>
            <div className="form-group">
                <label>Credit Card Expiry Date:</label>
                <input
                    type="text"
                    value={userData.CreditCardExpiry}
                    onChange={(e) => setUserData({...userData, CreditCardExpiry: e.target.value})}
                />
                    {errors.CreditCardExpiry && <div className="error-message">{errors.CreditCardExpiry}</div>}
                </div>
                <button onClick={handleSignUp}>Sign Up</button>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </div>
    );
};

export default SignUp;