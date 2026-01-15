import React from 'react';
import './CategoryListingsPage.css';

const CategoryListingsPage = ({ accommodations, onBack, onCardClick, type = 'hotels' }) => {
  const title = type === 'hotels' ? 'All Hotels' : type === 'homestays' ? 'All Homestays' : 'All Tents';
  const items = accommodations[type];

  return (
    <div className="category-listings-page">
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="listings-container">
        {/* Left Side - List */}
        <div className="listings-section">
          <h1 className="listings-title">{title}</h1>
          <p className="listings-subtitle">Browse all available {type} for Kumbh Mela 2027</p>
          
          <div className="listings-grid">
            {items.map((item) => (
              <div key={item.id} className="listing-card" onClick={() => onCardClick(item)}>
                <img src={item.image} alt={item.name} className="listing-image" />
                <div className="listing-details">
                  <h3 className="listing-name">{item.name}</h3>
                  <p className="listing-location">
                    <i className="fas fa-map-marker-alt"></i> {item.location}
                  </p>
                  <p className="listing-amenities">{item.amenities}</p>
                  <div className="listing-footer">
                    <span className="listing-price">{item.price}/night</span>
                    <span className="listing-rating">{item.rating} ★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Map & AI Planner */}
        <div className="map-planner-section">
          {/* Map Section */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60196.15!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb9d3a8b2d43%3A0x4f8f8f8f8f8f8f8f!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* AI Itinerary Planner */}
          <div className="ai-planner-container">
            <h3 className="section-heading">
              <i className="fas fa-robot"></i> AI Itinerary Planner
            </h3>
            <p className="planner-description">
              Get personalized travel plans for your Nashik visit during Kumbh Mela 2027
            </p>
            
            <div className="planner-form">
              <div className="form-field">
                <label className="form-label">Number of Days</label>
                <input 
                  type="number" 
                  placeholder="e.g., 3" 
                  className="planner-input"
                  min="1"
                  max="30"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Select Your Interests</label>
                <select className="planner-input">
                  <option>Choose category</option>
                  <option>Religious Sites</option>
                  <option>Cultural Heritage</option>
                  <option>Wine Tours</option>
                  <option>Nature & Scenic</option>
                </select>
              </div>
              <button className="planner-btn">
                <i className="fas fa-magic"></i> Generate Itinerary
              </button>
            </div>

            <div className="planner-output">
              <p className="planner-placeholder">
                <i className="fas fa-lightbulb"></i> Your AI-generated itinerary will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListingsPage;
