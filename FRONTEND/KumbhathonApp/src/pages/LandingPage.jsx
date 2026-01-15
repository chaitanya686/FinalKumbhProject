import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HeroSection from '../components/landing/HeroSection';
import CategoryCarousel from '../components/landing/CategoryCarousel';
import CategoryListingsPage from './CategoryListingsPage';
import PropertyDetailPage from './PropertyDetailPage';
import { accommodations } from '../data/accommodations';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'listings', 'detail', 'login', 'signup'
  const [selectedCategory, setSelectedCategory] = useState('hotels');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setCurrentView(mode);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('landing');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleCardClick = (item) => {
    setSelectedProperty(item);
    setCurrentView('detail');
  };

  const handleSeeMore = (category) => {
    setSelectedCategory(category);
    setCurrentView('listings');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedProperty(null);
  };

  const handleBackToListings = () => {
    setCurrentView('listings');
    setSelectedProperty(null);
  };

  // Show Login Page
  if (currentView === 'login') {
    return (
      <LoginPage 
        onClose={() => setCurrentView('landing')}
        onSwitchToSignup={() => setCurrentView('signup')}
      />
    );
  }

  // Show Sign Up Page
  if (currentView === 'signup') {
    return (
      <SignUpPage 
        onClose={() => setCurrentView('landing')}
        onSwitchToLogin={() => setCurrentView('login')}
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
        />
        <PropertyDetailPage 
          property={selectedProperty}
          onBack={handleBackToListings}
        />
        <Footer />
      </div>
    );
  }

  if (currentView === 'listings') {
    return (
      <div className="landing-page">
        <Header 
          isLoggedIn={isLoggedIn} 
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
        />
        <CategoryListingsPage 
          accommodations={accommodations}
          type={selectedCategory}
          onBack={handleBackToLanding}
          onCardClick={handleCardClick}
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
      />
      
      <main className="main-content">
        <HeroSection />
        
        <div className="accommodations-section">
          <div className="accommodations-content">
            <div className="section-header">
              <h2 className="section-title">Choose Your Stay Experience</h2>
             
            </div>

            <CategoryCarousel 
              title="Hotels"
              items={accommodations.hotels}
              onSeeMore={() => handleSeeMore('hotels')}
              onCardClick={handleCardClick}
            />

            <CategoryCarousel 
              title="Homestays"
              items={accommodations.homestays}
              onSeeMore={() => handleSeeMore('homestays')}
              onCardClick={handleCardClick}
            />

            <CategoryCarousel 
              title="Tents"
              items={accommodations.tents}
              onSeeMore={() => handleSeeMore('tents')}
              onCardClick={handleCardClick}
            />

            <CategoryCarousel 
              title="Dormitories"
              items={accommodations.dormitories}
              onSeeMore={() => handleSeeMore('dormitories')}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
