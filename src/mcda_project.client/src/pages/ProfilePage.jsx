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

    // Handle save for Basic Information
    const handleBasicInfoSave = () => {
        // Implement API call to save userData here
        // For demo, we'll just toggle edit mode
        setIsBasicInfoEdit(false);
    };

    // Handle save for Bank Information
    const handleBankInfoSave = () => {
        // Implement API call to save userData here
        // For demo, we'll just toggle edit mode
        setIsBankInfoEdit(false);
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

    // Handle login
    const handleLogin = (user) => {
        setUserData(user);
        setIsLoggedIn(true);
        setShowLogin(false);
    };

    // Handle sign up
    const handleSignUp = (newUser) => {
        // Simulated sign-up process
        setUserData(newUser);
        setIsLoggedIn(true);
        setShowSignUp(false);
    };

    // Automatically update username when first name or last name changes
    useEffect(() => {
        setUserData({
            ...userData,
            Username: `${userData.FirstName.toLowerCase()}_${userData.LastName.toLowerCase()}`,
        });
    }, [userData.FirstName, userData.LastName]);
    const onSignUp = (newUser) => {
        // Simulated sign-up process
        setUserData(newUser);
        setIsLoggedIn(true);
        setShowSignUp(false);
    };

    if (!isLoggedIn) {
        return (
            <div>
                {showLogin ? (
                    <Login onLogin={handleLogin} />
                ) : showSignUp ? (
                    <SignUp onSignUp={onSignUp} />
                ) : (
                    <div>
                        <p>You didn't login, Please Login</p>
                        <button onClick={() => setShowLogin(true)}>Login</button>
                        <button onClick={() => setShowSignUp(true)}>Sign Up</button>
                    </div>
                )}
            </div>
        );
    }


    return (
        <div className="profile-page">
            <div className="profile-content">
                {/* Basic Information Section */}
                <div className="profile-section basic-info">
                    <h1>Profile</h1>
                    <h2>Basic Information</h2>
                    <button
                        className="edit-button"
                        onClick={() => setIsBasicInfoEdit(!isBasicInfoEdit)}
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
                        </div>
                        <div className="form-group">
                            <label>ProvinceState:</label>
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
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <input
                                type="text"
                                value={userData.Country}
                                disabled={!isBasicInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        Country: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>PostalCode:</label>
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
                        </div>
                        <div className="form-group">
                            <label>PhoneNumber:</label>
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
                        </div>
                        <div className="form-group">
                            <label>EmailAddress:</label>
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
                        </div>
                    </div>
                </div>
                {/* Bank Information Section */}
                <div className="profile-section bank-info">
                    <h2>Bank Information</h2>
                    <button
                        className="edit-button"
                        onClick={() => setIsBankInfoEdit(!isBankInfoEdit)}
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
                        </div>
                        <div className="form-group">
                            <label>Credit Card Type:</label>
                            <select
                                disabled={!isBankInfoEdit}
                                className="custom-select"
                                type="text"
                                value={userData.CreditCardType}
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
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>CreditCardExpiry Date:</label>
                            <input
                                type="month"
                                value={userData.CreditCardExpiry}
                                disabled={!isBankInfoEdit}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        CreditCardExpiry: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;