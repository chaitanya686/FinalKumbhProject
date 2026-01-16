import React, { useState, useEffect } from 'react';
import './Header.css';
import { authAPI } from '../../services/api';

const Header = ({ isLoggedIn, onAuthClick, onLogout, onNavigate }) => {
  const [activeNav, setActiveNav] = useState('home');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authenticated = authAPI.isAuthenticated();
      const userData = authAPI.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
    if (onLogout) onLogout();
    window.location.reload();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return 'U';
    return parts.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleDisplay = (role) => {
    switch(role) {
      case 'host': return 'Host';
      case 'admin': return 'Admin';
      default: return 'Pilgrim';
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'explore', label: 'Explore Nashik' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src="/applogo.jpeg" alt="Aasray Logo" className="logo-image" />
          <div className="logo-text-container">
            <h1 className="logo-title">AASRAY</h1>
            <p className="logo-subtitle">Nashik 2027</p>
          </div>
        </div>
        
        <nav className="main-nav">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-btn ${(hoveredNav === item.id || (activeNav === item.id && hoveredNav === null)) ? 'nav-btn-active' : ''}`}
              onClick={() => {
                setActiveNav(item.id);
                if (item.id === 'home' && onNavigate) {
                  onNavigate('landing');
                } else if (item.id === 'contact' && onNavigate) {
                  onNavigate('contact');
                } else if (item.id === 'accommodation' && onNavigate) {
                  onNavigate('accommodation');
                } else if (item.id === 'explore' && onNavigate) {
                  onNavigate('explore');
                } else if (item.id === 'services' && onNavigate) {
                  onNavigate('services');
                }
              }}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="auth-section">
          {!isAuthenticated ? (
            <>
              <button onClick={() => onAuthClick('signup')} className="signup-btn">Sign Up</button>
              <button onClick={() => onAuthClick('login')} className="login-btn">Login</button>
            </>
          ) : (
            <div className="profile-container">
              {user?.role === 'host' && (
                <button 
                  onClick={() => onNavigate && onNavigate('dashboard')} 
                  className="dashboard-link"
                >
                  <i className="fas fa-tachometer-alt"></i>
                  Dashboard
                </button>
              )}
              {user?.role !== 'host' && (
                <button 
                  onClick={() => onNavigate && onNavigate('bookings')} 
                  className="dashboard-link"
                  style={{marginLeft: '0.5rem'}}
                >
                  <i className="fas fa-calendar-check"></i>
                  My Bookings
                </button>
              )}
              <div className="profile-info">
                <p className="profile-name">{user?.name || 'User'}</p>
                <p className="profile-role">{getRoleDisplay(user?.role)}</p>
              </div>
              <div className="profile-icon">
                <span className="profile-initials">{getInitials(user?.name)}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
