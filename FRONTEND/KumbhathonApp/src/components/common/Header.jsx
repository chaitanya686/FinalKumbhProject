import React, { useState, useEffect } from 'react';
import './Header.css';
import { authAPI } from '../../services/api';

const Header = ({ isLoggedIn, onAuthClick, onLogout, onNavigate }) => {
  const [activeNav, setActiveNav] = useState('home');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    switch (role) {
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

  // Close mobile menu on navigation or when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const handleNavigateWithClose = (id) => {
    setMobileOpen(false);
    setActiveNav(id);
    if (id === 'home' && onNavigate) onNavigate('landing');
    else if (id === 'contact' && onNavigate) onNavigate('contact');
    else if (id === 'accommodation' && onNavigate) onNavigate('accommodation');
    else if (id === 'explore' && onNavigate) onNavigate('explore');
    else if (id === 'services' && onNavigate) onNavigate('services');
  };

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
              onClick={() => handleNavigateWithClose(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="hamburger-btn"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(prev => !prev)}
        >
          <span className={`hamburger-icon ${mobileOpen ? 'open' : ''}`}></span>
        </button>

        {/* Mobile menu overlay */}
        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          <div className="mobile-nav-items">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-btn mobile-nav-btn ${(activeNav === item.id) ? 'nav-btn-active' : ''}`}
                onClick={() => handleNavigateWithClose(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mobile-auth">
            {!isAuthenticated ? (
              <>
                <button onClick={() => { setMobileOpen(false); onAuthClick('signup'); }} className="signup-btn">Sign Up</button>
                <button onClick={() => { setMobileOpen(false); onAuthClick('login'); }} className="login-btn">Login</button>
              </>
            ) : (
              <>
                {user?.role === 'host' ? (
                  <button onClick={() => { setMobileOpen(false); onNavigate && onNavigate('dashboard'); }} className="dashboard-link">Dashboard</button>
                ) : (
                  <button onClick={() => { setMobileOpen(false); onNavigate && onNavigate('bookings'); }} className="dashboard-link">My Bookings</button>
                )}
                <div className="mobile-profile">
                  <div className="profile-icon"><span className="profile-initials">{getInitials(user?.name)}</span></div>
                  <div className="profile-info">
                    <p className="profile-name">{user?.name || 'User'}</p>
                    <p className="profile-role">{getRoleDisplay(user?.role)}</p>
                  </div>
                </div>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="logout-btn">Logout</button>
              </>
            )}
          </div>
        </div>

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
                  style={{ marginLeft: '0.5rem' }}
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
