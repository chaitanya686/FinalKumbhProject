import React, { useState, useEffect } from 'react';
import './PropertyDetailPage.css';
import RatingReviews from '../components/RatingReviews';
import { bookingAPI, authAPI } from '../services/api';

const PropertyDetailPage = ({ property, onBack }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowBackBtn(currentScroll <= lastScroll || currentScroll < 100);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!property) {
    return <div>Loading...</div>;
  }

  const additionalImages = [
    property.image || (property.images && property.images[0]?.url) || 'https://via.placeholder.com/500x300?text=No+Image',
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500"
  ];

  const bathroomImages = [
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500",
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500"
  ];

  const features = [
    { icon: "wifi", text: "Free WiFi" },
    { icon: "swimming-pool", text: "Swimming Pool" },
    { icon: "parking", text: "Free Parking" },
    { icon: "utensils", text: "Restaurant" },
    { icon: "dumbbell", text: "Gym" },
    { icon: "concierge-bell", text: "Room Service" }
  ];

  const itinerary = [
    { time: "6:00 AM", activity: `Depart from ${property.type || 'accommodation'} to Ramkund`, distance: "2.5 km" },
    { time: "6:30 AM", activity: "Holy bath at Ramkund", distance: "0 km" },
    { time: "8:00 AM", activity: "Visit Kalaram Temple", distance: "0.5 km" },
    { time: "10:00 AM", activity: `Return to ${property.type || 'accommodation'} for breakfast`, distance: "2.5 km" },
    { time: "12:00 PM", activity: "Visit Panchavati area", distance: "3 km" },
    { time: "4:00 PM", activity: "Evening Aarti at Godavari", distance: "2 km" }
  ];

  const calculateTotal = () => {
    const priceString = property.price || `₹${property.pricing?.basePrice}` || '₹0';
    const pricePerNight = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
    const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 1;
    return pricePerNight * nights * guests;
  };

  const handleBooking = async () => {
    if (!authAPI.isAuthenticated()) {
      alert('Please login to book this property');
      return;
    }
    if (!checkIn || !checkOut) {
      setBookingError('Please select check-in and check-out dates');
      return;
    }
    
    // Check if property has valid MongoDB _id
    const propertyId = property._id;
    if (!propertyId) {
      alert('This is a demo property. Please select a real property from the database to book.');
      return;
    }
    
    setBookingLoading(true);
    setBookingError('');
    try {
      await bookingAPI.create({
        property: propertyId,
        checkIn,
        checkOut,
        guests,
        totalPrice: calculateTotal()
      });
      setBookingSuccess(true);
      alert('Booking successful!');
    } catch (error) {
      setBookingError(error.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="accommodation-detail-page">
      <button className={`back-btn ${showBackBtn ? 'visible' : 'hidden'}`} onClick={onBack}>
        <i className="fas fa-arrow-left"></i>
      </button>

      <div className="detail-content-grid">
        <div className="detail-left">
          <div className="photos-section">
            <h2 className="section-title">{property.name || property.title}</h2>
            <p className="property-location">
              <i className="fas fa-map-marker-alt"></i> {property.location?.address || property.location?.city || property.location}
            </p>
            <div className="photos-grid">
              {additionalImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Property ${idx + 1}`} className="gallery-image" />
              ))}
            </div>
          </div>

          <div className="description-section">
            <h2 className="section-title">About this property</h2>
            <p className="description-text">{property.description}</p>
            <p className="description-text">
              Located in the heart of Nashik, this property offers easy access to all major Kumbh Mela sites.
              Experience comfort and spirituality combined with modern amenities and traditional hospitality.
            </p>

            <h2 className="section-title" style={{marginTop: '1.5rem'}}>Hosted by</h2>
            <div className="host-card">
              <div className="host-avatar">
                <img src="https://i.pravatar.cc/150?img=12" alt="Host" />
              </div>
              <div className="host-info">
                <h3 className="host-name">Rajesh Kumar</h3>
                <p className="host-id">Host ID: #KMB2027-{property.id}892</p>
                <p className="host-stats">
                  <span><i className="fas fa-star"></i> 4.8 Rating</span>
                  <span><i className="fas fa-home"></i> 12 Properties</span>
                </p>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2 className="section-title">Amenities & Features</h2>
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <i className={`fas fa-${feature.icon}`}></i>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sanitation-section">
            <h2 className="section-title">
              <i className="fas fa-check-circle"></i> Sanitation & Hygiene
            </h2>
            <div className="sanitation-badges">
              <span className="badge">✓ Daily Sanitization</span>
              <span className="badge">✓ Fire Safety Certified</span>
              <span className="badge">✓ Clean Water Supply</span>
              <span className="badge">✓ Waste Management</span>
            </div>

            <h3 className="subsection-title">Bathroom Facilities</h3>
            <div className="bathroom-grid">
              {bathroomImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Bathroom ${idx + 1}`} className="bathroom-image" />
              ))}
            </div>
          </div>

          <RatingReviews />

          <button className="host-connect-btn">
            <i className="fas fa-comments"></i> Connect with Host
          </button>
        </div>

        <div className="detail-right">
          <div className="map-section">
            <h3 className="map-title section-title">You Will be here</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60196.15!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb9d3a8b2d43%3A0x4f8f8f8f8f8f8f8f!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="120%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="itinerary-section">
            <h2 className="section-title">
              <i className="fas fa-route"></i> Suggested Itinerary
            </h2>
            <p className="itinerary-subtitle">Daily plan from this location</p>
            <div className="timeline">
              {itinerary.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="timeline-time">{item.time}</span>
                    <p className="timeline-activity">{item.activity}</p>
                    <span className="timeline-distance">
                      <i className="fas fa-map-marker-alt"></i> {item.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="payment-section">
            <h2 className="section-title">Booking Details</h2>

              <div className="price-display">
              <span className="price-label">Price per night</span>
              <span className="price-value">{property.price || `₹${property.pricing?.basePrice}`}</span>
            </div>

            <div className="booking-form">
              <div className="form-group">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="date-input"
                />
              </div>

              <div className="form-group">
                <label>Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="date-input"
                />
              </div>

              <div className="form-group">
                <label>Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="guest-select"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span>Total Amount</span>
                  <span className="breakdown-value">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              {bookingError && <div style={{color: 'red', marginBottom: '1rem'}}>{bookingError}</div>}
              {bookingSuccess && <div style={{color: 'green', marginBottom: '1rem'}}>Booking successful!</div>}

              <div className="booking-actions">
                <button className="reserve-btn" onClick={handleBooking} disabled={bookingLoading}>
                  <i className="fas fa-bookmark"></i> {bookingLoading ? 'Processing...' : 'Reserve'}
                </button>
                <button className="book-btn" onClick={handleBooking} disabled={bookingLoading}>
                  <i className="fas fa-check-circle"></i> {bookingLoading ? 'Processing...' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;