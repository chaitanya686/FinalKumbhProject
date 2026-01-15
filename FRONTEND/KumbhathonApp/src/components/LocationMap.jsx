import React from 'react';

const LocationMap = ({ location }) => {
  return (
    <div className="location-map-section">
      <h2 className="section-title">You will be here</h2>
      <div className="map-container">
        <p>{location}</p>
        <p>Map will be integrated here</p>
      </div>
    </div>
  );
};

export default LocationMap;