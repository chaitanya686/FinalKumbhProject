import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import './MyBookings.css';

const MyBookings = ({ onBack }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await bookingAPI.cancel(bookingId);
      alert('Booking cancelled successfully');
      loadBookings();
    } catch (err) {
      alert('Failed to cancel booking: ' + err.message);
    }
  };

  if (loading) return <div style={{padding: '2rem', textAlign: 'center'}}>Loading bookings...</div>;

  return (
    <div className="my-bookings-page">
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="bookings-container">
        <h1>My Bookings</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <i className="fas fa-calendar-times fa-3x"></i>
            <p>No bookings yet</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.property?.title || 'Property'}</h3>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="booking-details">
                  <p><i className="fas fa-calendar-check"></i> Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p><i className="fas fa-calendar-times"></i> Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><i className="fas fa-users"></i> Guests: {booking.guests}</p>
                  <p><i className="fas fa-rupee-sign"></i> Total: ₹{booking.totalPrice}</p>
                </div>

                {booking.status === 'confirmed' && (
                  <button 
                    className="cancel-btn" 
                    onClick={() => handleCancel(booking._id)}
                  >
                    <i className="fas fa-times-circle"></i> Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
