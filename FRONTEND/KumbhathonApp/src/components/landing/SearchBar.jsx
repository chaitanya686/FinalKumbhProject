import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    location: 'Nashik, Maharashtra',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <div className="search-grid">
          <div className="search-field">
            <div className="input-group">
              <input
                type="text"
                className="search-input"
                id="location"
                value={searchData.location}
                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                placeholder=" "
                autoFocus
              />
              <label htmlFor="location" className="floating-label">Location</label>
            </div>
          </div>

          <div className="search-field">
            <div className="input-group">
              <input
                type="date"
                className="search-input"
                id="checkin"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                placeholder=" "
              />
              <label htmlFor="checkin" className="floating-label">Check-in</label>
            </div>
          </div>

          <div className="search-field">
            <div className="input-group">
              <input
                type="date"
                className="search-input"
                id="checkout"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                placeholder=" "
              />
              <label htmlFor="checkout" className="floating-label">Check-out</label>
            </div>
          </div>

          <div className="search-field">
            <div className="input-group">
              <input
                type="number"
                className="search-input"
                id="guests"
                min="1"
                value={searchData.guests}
                onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                placeholder=" "
              />
              <label htmlFor="guests" className="floating-label">Guests</label>
            </div>
          </div>

          <button className="search-button" onClick={handleSearch}>
            <i className="fas fa-search"></i>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
