import React from 'react';
import './RatingReviews.css';

const RatingReviews = () => {
  const ratings = {
    overall: 4.6,
    cleanliness: 4.8,
    location: 4.9,
    value: 4.3
  };

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent location for Kumbh Mela! Very clean and the host was extremely helpful. Walking distance to all major ghats."
    },
    {
      id: 2,
      name: "Amit Patel",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 4,
      date: "1 week ago",
      comment: "Good value for money. The accommodation was clean and comfortable. Perfect for pilgrims visiting during Kumbh."
    },
    {
      id: 3,
      name: "Sunita Devi",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing experience! The host provided great guidance for Kumbh rituals. Highly recommended for spiritual travelers."
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.floor(rating) ? 'filled' : i < rating ? 'half' : 'empty'}`}
      ></i>
    ));
  };

  return (
    <div className="rating-reviews-section">
      <h2 className="section-title">Ratings & Reviews</h2>
      
      <div className="ratings-overview">
        <div className="overall-rating">
          <div className="rating-score">{ratings.overall}</div>
          <div className="rating-stars">{renderStars(ratings.overall)}</div>
          <div className="rating-count">Based on 47 reviews</div>
        </div>
        
        <div className="rating-breakdown">
          <div className="rating-item">
            <span className="rating-label">Cleanliness</span>
            <div className="rating-bar">
              <div className="rating-fill" style={{width: `${(ratings.cleanliness/5)*100}%`}}></div>
            </div>
            <span className="rating-value">{ratings.cleanliness}</span>
          </div>
          
          <div className="rating-item">
            <span className="rating-label">Location</span>
            <div className="rating-bar">
              <div className="rating-fill" style={{width: `${(ratings.location/5)*100}%`}}></div>
            </div>
            <span className="rating-value">{ratings.location}</span>
          </div>
          
          <div className="rating-item">
            <span className="rating-label">Value</span>
            <div className="rating-bar">
              <div className="rating-fill" style={{width: `${(ratings.value/5)*100}%`}}></div>
            </div>
            <span className="rating-value">{ratings.value}</span>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        <h3 className="reviews-title">Guest Reviews</h3>
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
              <div className="reviewer-info">
                <h4 className="reviewer-name">{review.name}</h4>
                <div className="review-meta">
                  <div className="review-stars">{renderStars(review.rating)}</div>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingReviews;