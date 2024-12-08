import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    // State to hold user data
    const [userData, setUserData] = useState({
        UserID: 1,
        Username: 'chefmaster',
        PasswordHash: 'hashed_password_123',
        FirstName: 'John',
        LastName: 'Doe',
        City: 'Halifax',
        ProvinceState: 'Nova Scotia',
        Country: 'Canada',
        PostalCode: 'B3J1A1',
        PhoneNumber: '+19025551234',
        EmailAddress: 'john.doe@example.com',
        CreditCardNumber: '4111111111111111',
        CreditCardType: 'Visa',
        CreditCardExpiry: '2025-12',
    });

    // State to manage edit modes
    const [isBasicInfoEdit, setIsBasicInfoEdit] = useState(false);
    const [isBankInfoEdit, setIsBankInfoEdit] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle save for Basic Information
    const handleBasicInfoSave = () => {
        if (validateForm()) {
            // Implement API call to save userData here
            // For demo, we'll just toggle edit mode
            setIsBasicInfoEdit(false);
        }
    };

    // Handle save for Bank Information
    const handleBankInfoSave = () => {
        if (validateForm()) {
            // Implement API call to save userData here
            // For demo, we'll just toggle edit mode
            setIsBankInfoEdit(false);
        }
    };

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

    // Fetch user data (simulated)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Simulated API call
                const data = {
                    results: [
                        {
                            UserID: 1,
                            Username: 'chefmaster',
                            PasswordHash: 'hashed_password_123',
                            FirstName: 'John',
                            LastName: 'Doe',
                            City: 'Halifax',
                            ProvinceState: 'Nova Scotia',
                            Country: 'Canada',
                            PostalCode: 'B3J1A1',
                            PhoneNumber: '+19025551234',
                            EmailAddress: 'john.doe@example.com',
                            CreditCardNumber: '4111111111111111',
                            CreditCardType: 'Visa',
                            CreditCardExpiry: '2025-12',
                        },
                    ],
                };
                setUserData(data.results[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Format the expiry date from 'YYYY-MM' to 'MM/YYYY'
    const formatExpiryDate = (expiryDate) => {
        if (!expiryDate) return '';
        const [year, month] = expiryDate.split('-');
        return `${month}/${year}`;
    };

    // Parse the expiry date from 'MM/YYYY' to 'YYYY-MM'
    const parseExpiryDate = (expiryDate) => {
        if (!expiryDate) return '';
        const [month, year] = expiryDate.split('/');
        return `${year}-${month}`;
    };

    return (
        <div className="profile-page">
            <div className="profile-content">
                {/* Basic Information Section */}
                <div className="profile-section basic-info">
                    <h1>Profile</h1>
                    <h2>Basic Information</h2>
                    <button
                        className="edit-button"
                        onClick={() => {
                            if (isBasicInfoEdit) {
                                handleBasicInfoSave();
                            } else {
                                setIsBasicInfoEdit(true);
                            }
                        }}
                    >
                        {isBasicInfoEdit ? 'Save' : 'Edit'}
                    </button>
                    <div className="section-content">
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={userData.FirstName}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        FirstName: e.target.value,
                                    })
                                }
                            />
                            {errors.FirstName && <div className="error-message">{errors.FirstName}</div>}
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={userData.LastName}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        LastName: e.target.value,
                                    })
                                }
                            />
                            {errors.LastName && <div className="error-message">{errors.LastName}</div>}
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <input
                                type="text"
                                value={userData.City}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        City: e.target.value,
                                    })
                                }
                            />
                            {errors.City && <div className="error-message">{errors.City}</div>}
                        </div>
                        <div className="form-group">
                            <label>Province/State:</label>
                            <input
                                type="text"
                                value={userData.ProvinceState}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        ProvinceState: e.target.value,
                                    })
                                }
                            />
                            {errors.ProvinceState && <div className="error-message">{errors.ProvinceState}</div>}
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <select
                                value={userData.Country}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        Country: e.target.value,
                                    })
                                }
                            >
                                <option value="Canada">Canada</option>
                                <option value="USA">USA</option>
                            </select>
                            {errors.Country && <div className="error-message">{errors.Country}</div>}
                        </div>
                        <div className="form-group">
                            <label>Postal Code:</label>
                            <input
                                type="text"
                                value={userData.PostalCode}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        PostalCode: e.target.value,
                                    })
                                }
                            />
                            {errors.PostalCode && <div className="error-message">{errors.PostalCode}</div>}
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                value={userData.PhoneNumber}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        PhoneNumber: e.target.value,
                                    })
                                }
                            />
                            {errors.PhoneNumber && <div className="error-message">{errors.PhoneNumber}</div>}
                        </div>
                        <div className="form-group">
                            <label>Email Address:</label>
                            <input
                                type="text"
                                value={userData.EmailAddress}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        EmailAddress: e.target.value,
                                    })
                                }
                            />
                            {errors.EmailAddress && <div className="error-message">{errors.EmailAddress}</div>}
                        </div>
                    </div>
                </div>
                {/* Bank Information Section */}
                <div className="profile-section bank-info">
                    <h2>Bank Information</h2>
                    <button
                        className="edit-button"
                        onClick={() => {
                            if (isBankInfoEdit) {
                                handleBankInfoSave();
                            } else {
                                setIsBankInfoEdit(true);
                            }
                        }}
                    >
                        {isBankInfoEdit ? 'Save' : 'Edit'}
                    </button>
                    <div className="section-content">
                        <div className="form-group">
                            <label>Credit Card Number:</label>
                            <input
                                type="text"
                                value={userData.CreditCardNumber}
                                disabled={!isBankInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        CreditCardNumber: e.target.value,
                                    })
                                }
                            />
                            {errors.CreditCardNumber && <div className="error-message">{errors.CreditCardNumber}</div>}
                        </div>
                        <div className="form-group">
                            <label>Credit Card Type:</label>
                            <select
                                value={userData.CreditCardType}
                                disabled={!isBankInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        CreditCardType: e.target.value,
                                    })
                                }
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
                                value={formatExpiryDate(userData.CreditCardExpiry)}
                                disabled={!isBankInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        CreditCardExpiry: parseExpiryDate(e.target.value),
                                    })
                                }
                            />
                            {errors.CreditCardExpiry && <div className="error-message">{errors.CreditCardExpiry}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;