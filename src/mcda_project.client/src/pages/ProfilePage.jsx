import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    // Sample user data
    const initialUserData = {
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
    };

    // State to hold user data
    const [userData, setUserData] = useState(initialUserData);
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
    // 格式化 CreditCardExpiry 的函数
    const formatExpiryDate = (input) => {
        const match = input.match(/^(\d{4})-(\d{2})$/);
        if (match) {
            const [, year, month] = match;
            return `${month}/${year.slice(2)}`; // 转换成 MM/YY
        }
        return input; // 如果不匹配，则返回原始值
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