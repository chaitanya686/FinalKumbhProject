import React from 'react';
import './AccommodationCard.css';

const AccommodationCard = ({ accommodation, onClick }) => {
  const getSecurityLevel = (rating) => {
    if (rating >= 4.5) return { label: 'Highly Secure', color: '#10B981' };
    if (rating >= 4.0) return { label: 'Secure', color: '#FF9933' };
    return { label: 'Basic Security', color: '#6B7280' };
  };

  const security = getSecurityLevel(accommodation.rating || accommodation.ratings?.average || 0);
  
  // Get all available images - dummy data first, then host uploaded
  const getAllImages = () => {
    const images = [];
    
    // Add dummy data image first if it exists
    if (accommodation.image) {
      images.push(accommodation.image);
    }
    
    // Add host uploaded images after dummy images
    if (accommodation.images && accommodation.images.length > 0) {
      accommodation.images.forEach(img => {
        if (img.url) images.push(img.url);
      });
    }
    
    return images.length > 0 ? images : ['https://via.placeholder.com/500x300?text=No+Image'];
  };
  
  const allImages = getAllImages();
  const displayImage = allImages[0]; // Show first image as main
  
  const displayName = accommodation.name || accommodation.title;
  const displayPrice = accommodation.price || `₹${accommodation.pricing?.basePrice}`;
  const displayRating = accommodation.rating || accommodation.ratings?.average || 0;

  return (
    <div className="accommodation-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={displayImage} alt={displayName} className="card-image" />
        {allImages.length > 1 && (
          <div className="image-count">
            <i className="fas fa-images"></i> {allImages.length}
          </div>
        )}
        <div className="security-badge">
          <span className="security-icon">🛡️</span>
          <span className="security-text">{security.label}</span>
        </div>
      </div>
      <div className="card-details">
        <h4 className="card-title">{displayName}</h4>
        <div className="card-info">
          <span className="card-price">{displayPrice}</span>
          <span className="card-rating">{displayRating} ★</span>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
