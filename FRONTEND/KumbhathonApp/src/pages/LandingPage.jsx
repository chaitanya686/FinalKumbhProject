import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ContactUs from './ContactUs';
import AccommodationPage from './AccommodationPage';
import ExploreNashikPage from './ExploreNashikPage';
import ServicesPage from './ServicesPage';
import MyBookings from './MyBookings';
import HeroSection from '../components/landing/HeroSection';
import CategoryCarousel from '../components/landing/CategoryCarousel';
import CategoryListingsPage from './CategoryListingsPage';
import PropertyDetailPage from './PropertyDetailPage';
import { accommodations } from '../data/accommodations';
import { authAPI, propertyAPI } from '../services/api';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'listings', 'detail', 'login', 'signup', 'contact'
  const [selectedCategory, setSelectedCategory] = useState('hotels');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState({
    hotels: accommodations.hotels,
    homestays: accommodations.homestays,
    tents: accommodations.tents,
    dormitories: accommodations.dormitories
  });
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    // Check authentication status on component mount
    setIsLoggedIn(authAPI.isAuthenticated());
    // Load properties
    loadProperties();
    // Load user bookings if logged in
    if (authAPI.isAuthenticated()) {
      loadUserBookings();
    }
  }, []);

  const loadUserBookings = async () => {
    try {
      const { bookingAPI } = await import('../services/api');
      const response = await bookingAPI.getMyBookings();
      setUserBookings(response.data || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyAPI.getAll();
      const allProperties = response.data || [];

      if (!allProperties || allProperties.length === 0) {
        throw new Error('No properties found');
      }

      // Group properties by type
      const grouped = {
        hotels: allProperties.filter(p => p.type === 'hotel'),
        homestays: allProperties.filter(p => p.type === 'homestay'),
        tents: allProperties.filter(p => p.type === 'tent'),
        dormitories: allProperties.filter(p => p.type === 'dormitory')
      };

      setProperties(grouped);
    } catch (error) {
      console.error('Error loading properties:', error);
      // Fallback to dummy data if API fails
      setProperties({
        hotels: accommodations.hotels || [],
        homestays: accommodations.homestays || [],
        tents: accommodations.tents || [],
        dormitories: accommodations.dormitories || []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const response = await propertyAPI.getAll({
        search: searchParams.search,
        guests: searchParams.guests
      });

      const results = response.data;

      // Group search results by type
      const grouped = {
        hotels: results.filter(p => p.type === 'hotel'),
        homestays: results.filter(p => p.type === 'homestay'),
        tents: results.filter(p => p.type === 'tent'),
        dormitories: results.filter(p => p.type === 'dormitory')
      };

      setSearchResults(grouped);
      setCurrentView('search-results');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setCurrentView(mode);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('landing');
    loadUserBookings();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCardClick = (item) => {
    setSelectedProperty(item);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const handleSeeMore = (category) => {
    setSelectedCategory(category);
    setCurrentView('listings');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedProperty(null);
    setSearchResults(null);
    window.scrollTo(0, 0);
  };

  const handleBackToListings = () => {
    setCurrentView('listings');
    setSelectedProperty(null);
    window.scrollTo(0, 0);
  };

  // Show My Bookings Page
  if (currentView === 'bookings') {
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <MyBookings onBack={() => setCurrentView('landing')} onViewProperty={handleCardClick} />
        <Footer />
      </div>
    );
  }

  // Show Dashboard Page
  if (currentView === 'dashboard') {
    const HostDashboard = React.lazy(() => import('./HostDashboard'));
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <React.Suspense fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
          <HostDashboard onBack={() => setCurrentView('landing')} />
        </React.Suspense>
        <Footer />
      </div>
    );
  }

  // Show Contact Us Page
  if (currentView === 'contact') {
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <ContactUs />
        <Footer />
      </div>
    );
  }

  // Show Accommodation Page
  if (currentView === 'accommodation') {
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <AccommodationPage 
          onCardClick={handleCardClick}
          onBack={() => setCurrentView('landing')}
        />
        <Footer />
      </div>
    );
  }

  // Show Explore Nashik Page
  if (currentView === 'explore') {
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <ExploreNashikPage 
          onBack={() => setCurrentView('landing')}
        />
        <Footer />
      </div>
    );
  }

  // Show Services Page
  if (currentView === 'services') {
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <ServicesPage 
          onBack={() => setCurrentView('landing')}
        />
        <Footer />
      </div>
    );
  }

  // Show Login Page
  if (currentView === 'login') {
    return (
      <LoginPage
        onClose={() => setCurrentView('landing')}
        onSwitchToSignup={() => setCurrentView('signup')}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  // Show Sign Up Page
  if (currentView === 'signup') {
    return (
      <SignUpPage
        onClose={() => setCurrentView('landing')}
        onSwitchToLogin={() => setCurrentView('login')}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentView === 'detail' && selectedProperty) {
    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <PropertyDetailPage
          property={selectedProperty}
          onBack={handleBackToListings}
          userBookings={userBookings}
        />
        <Footer />
      </div>
    );
  }

  // Show search results or regular listings
  if (currentView === 'listings' || currentView === 'search-results') {
    const displayData = currentView === 'search-results' ? searchResults : properties;
    const isSearchResults = currentView === 'search-results';

    return (
      <div className="landing-page">
        <Header
          isLoggedIn={isLoggedIn}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        <CategoryListingsPage
          accommodations={displayData}
          type={isSearchResults ? 'all' : selectedCategory}
          onBack={handleBackToLanding}
          onCardClick={handleCardClick}
          isSearchResults={isSearchResults}
          searchResultsCount={isSearchResults ? Object.values(searchResults).flat().length : 0}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="landing-page">
      <Header
        isLoggedIn={isLoggedIn}
        onAuthClick={handleAuthClick}
        onLogout={handleLogout}
        onNavigate={setCurrentView}
      />

      <main className="main-content">
        <HeroSection onSearch={handleSearch} />

        <div className="accommodations-section">
          <div className="accommodations-content">
            <div className="section-header">
              <h2 className="section-title">Choose Your Stay Experience</h2>
            </div>

            {loading ? (
              <div className="loading-section">
                <i className="fas fa-spinner fa-spin fa-2x"></i>
                <p>Loading properties...</p>
              </div>
            ) : (
              <>
                <CategoryCarousel
                  title="Hotels"
                  items={properties.hotels}
                  onSeeMore={() => handleSeeMore('hotels')}
                  onCardClick={handleCardClick}
                />

                <CategoryCarousel
                  title="Homestays"
                  items={properties.homestays}
                  onSeeMore={() => handleSeeMore('homestays')}
                  onCardClick={handleCardClick}
                />

                <CategoryCarousel
                  title="Tents"
                  items={properties.tents}
                  onSeeMore={() => handleSeeMore('tents')}
                  onCardClick={handleCardClick}
                />

                <CategoryCarousel
                  title="Dormitories"
                  items={properties.dormitories}
                  onSeeMore={() => handleSeeMore('dormitories')}
                  onCardClick={handleCardClick}
                />
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
