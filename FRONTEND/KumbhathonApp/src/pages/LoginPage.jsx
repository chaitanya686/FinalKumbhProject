import React, { useState } from 'react';
import './AuthPages.css';
import { authAPI } from '../services/api';

const LoginPage = ({ onClose, onSwitchToSignup, onSuccess }) => {
  const [userType, setUserType] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const credentials = {
        email: formData.emailOrMobile,
        password: formData.password
      };

      const response = await authAPI.login(credentials);
      console.log('Login successful:', response);
      
      // Close modal and update parent state
      onClose();
      if (onSuccess) onSuccess();
      
      // Force header to update by triggering a re-render
      window.dispatchEvent(new Event('auth-change'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="auth-modal-content">
          {/* Left - Visual */}
          <div className="auth-visual-side">
            <img 
              src="/signup-image.png" 
              alt="Aasray Login" 
              className="auth-visual-image"
            />
          </div>

          {/* Right - Form */}
          <div className="auth-form-side">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Welcome Back</h2>
              <p className="auth-form-subtitle">Sign in to continue your journey</p>
            </div>

            {/* Role Selection */}
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${userType === 'customer' ? 'active' : ''}`}
                onClick={() => setUserType('customer')}
              >
                <i className="fas fa-user"></i> Customer
              </button>
              <button
                type="button"
                className={`role-btn ${userType === 'host' ? 'active' : ''}`}
                onClick={() => setUserType('host')}
              >
                <i className="fas fa-home"></i> Host/Owner
              </button>
            </div>

            <form className="auth-form-main" onSubmit={handleSubmit}>
              {error && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}
              
              <div className="auth-input-group">
                <label className="auth-label">Email or Mobile Number</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Enter your email or mobile number"
                  value={formData.emailOrMobile}
                  onChange={(e) => setFormData({...formData, emailOrMobile: e.target.value})}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Signing In...
                  </>
                ) : (
                  `Sign In as ${userType === 'customer' ? 'Customer' : 'Host'}`
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-switch-text">
              Don't have an account?
              <button className="auth-switch-btn" onClick={onSwitchToSignup}>
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
