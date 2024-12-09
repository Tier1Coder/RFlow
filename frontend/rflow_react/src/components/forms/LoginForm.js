import React, { useState } from 'react';
import { login } from '../../services/AuthService';
import '../../styles/components/forms/LoginForm.css';
import { AppLogoIcon } from '../../assets/app/AppLogoIcon.jsx';

/**
 * LoginForm Component
 * 
 * A form component for user login.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onLogin - The function to call when login is successful.
 */
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Handles form submission.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const access = await login(username, password);
      onLogin(access);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form-container">
      <AppLogoIcon className="login-form-app-logo-icon" width="100" height="100" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="login-form-error-message">{error}</div>}
        <div className="login-form-input-group">
          <label>Username:
            <input
              id="login-form-username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="login-form-input-group">
          <label>Password:
            <input
              id="login-form-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
