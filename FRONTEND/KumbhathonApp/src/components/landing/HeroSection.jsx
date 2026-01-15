import React from 'react';
import SearchBar from './SearchBar';
import './HeroSection.css';

const HeroSection = ({ onSearch }) => {
  const kumbhImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ];

  return (
    <div className="hero-section">
      <p className="hero-tagline">A safe place to rest, on a sacred journey.</p>
      <div className="hero-image-slider">
        <div className="slider-track">
          {[...kumbhImages, ...kumbhImages].map((img, index) => (
            <div key={index} className="slide">
              <img src={img} alt={`Kumbh accommodation ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default HeroSection;
