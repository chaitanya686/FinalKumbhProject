import React, { useState } from 'react';
import './AuthPages.css';
import { authAPI } from '../services/api';

const SignUpPage = ({ onClose, onSwitchToLogin, onSuccess }) => {
  const [userType, setUserType] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    surname: '',
    mobile: '',
    email: '',
    password: '',
    propertyName: '',
    location: '',
    shelterType: '',
    aadhar: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare data based on user type
      const userData = {
        role: userType === 'customer' ? 'user' : 'host',
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password
      };

      if (userType === 'customer') {
        const fullName = [formData.firstName, formData.middleName, formData.surname]
          .filter(Boolean)
          .join(' ')
          .trim();
        userData.name = fullName || 'User';
      } else {
        userData.name = formData.propertyName;
        userData.propertyDetails = {
          location: formData.location,
          type: formData.shelterType,
          aadhar: formData.aadhar
        };
      }

      const response = await authAPI.register(userData);
      console.log('Registration successful:', response);
      
      // Close modal and update parent state
      onClose();
      if (onSuccess) onSuccess();
      
      // Force header to update
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
              src="/src/data/img for signup page.png" 
              alt="Kumbhathon" 
              className="auth-visual-image"
            />
          </div>

          {/* Right - Form */}
          <div className="auth-form-side">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Create Account</h2>
              <p className="auth-form-subtitle">Start your journey with us</p>
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
              
              {userType === 'customer' ? (
                // Customer Form
                <>
                  <div className="auth-input-group">
                    <label className="auth-label">First Name</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Middle Name</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Surname</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="Enter surname"
                      value={formData.surname}
                      onChange={(e) => setFormData({...formData, surname: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="auth-input"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Email (Optional)</label>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Password</label>
                    <input
                      type="password"
                      className="auth-input"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      minLength="6"
                    />
                  </div>
                </>
              ) : (
                // Host/Owner Form
                <>
                  <div className="auth-input-group">
                    <label className="auth-label">Property Name</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="Enter property name"
                      value={formData.propertyName}
                      onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Location</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="Enter property location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Shelter Type</label>
                    <select
                      className="auth-input"
                      value={formData.shelterType}
                      onChange={(e) => setFormData({...formData, shelterType: e.target.value})}
                      required
                    >
                      <option value="">Select shelter type</option>
                      <option value="hotel">Hotel</option>
                      <option value="homestay">Homestay</option>
                      <option value="tent">Tent</option>
                      <option value="dormitory">Dormitory</option>
                    </select>
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Aadhar Number (Verification)</label>
                    <input
                      type="text"
                      className="auth-input"
                      placeholder="Enter 12-digit Aadhar number"
                      value={formData.aadhar}
                      onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
                      maxLength="12"
                      pattern="[0-9]{12}"
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="auth-input"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Email</label>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <label className="auth-label">Password</label>
                    <input
                      type="password"
                      className="auth-input"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      minLength="6"
                    />
                  </div>
                </>
              )}

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating Account...
                  </>
                ) : (
                  `Sign Up as ${userType === 'customer' ? 'Customer' : 'Host'}`
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-switch-text">
              Already have an account?
              <button className="auth-switch-btn" onClick={onSwitchToLogin}>
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
