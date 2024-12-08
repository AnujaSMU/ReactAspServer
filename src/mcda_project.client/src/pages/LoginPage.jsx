import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // 确保你有一个对应的 CSS 文件

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Simulated login check
        const users = [
            {
                EmailAddress: 'john.doe@example.com',
                PasswordHash: 'hashed_password_123',
                UserID: 1,
                Username: 'chefmaster',
                FirstName: 'John',
                LastName: 'Doe',
                City: 'Halifax',
                ProvinceState: 'Nova Scotia',
                Country: 'Canada',
                PostalCode: 'B3J1A1',
                PhoneNumber: '+19025551234',
                CreditCardNumber: '4111111111111111',
                CreditCardType: 'Visa',
                CreditCardExpiry: '2025-12',
            },
        ];

        const user = users.find(u => u.EmailAddress === email && u.PasswordHash === password);
        if (user) {
            onLogin(user);
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleLogin}>Login</button>
                <div className="signup-link">
                    Don't have an account? <Link to="/signup">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;