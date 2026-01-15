import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: 'Nashik, Maharashtra',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        search: searchData.location,
        guests: searchData.guests,
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
                onKeyPress={handleKeyPress}
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
                onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) || 1 })}
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
