import React from 'react';
import AccommodationCard from '../shared/AccommodationCard';
import './CategoryCarousel.css';

const CategoryCarousel = ({ title, description, items, onSeeMore, onCardClick }) => {
  return (
    <div className="category-section">
      <div className="category-header">
        <div>
          <h3 className="category-title">{title}</h3>
          <p className="category-description">{description}</p>
        </div>
        {items.length > 5 && (
          <button className="see-all-arrow" onClick={onSeeMore}>
            <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>
      
      <div className="category-carousel">
        {items.slice(0, 5).map((item) => (
          <AccommodationCard 
            key={item.id || item._id || Math.random()} 
            accommodation={item} 
            onClick={() => onCardClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
