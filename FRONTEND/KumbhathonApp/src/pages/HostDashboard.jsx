import React, { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';
import PhotoUpload from '../components/PhotoUpload';
import './HostDashboard.css';

const HostDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await propertyAPI.getMyProperties();
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyAPI.delete(id);
        setProperties(properties.filter(p => p._id !== id));
      } catch (error) {
        alert('Error deleting property: ' + error.message);
      }
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowAddForm(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingProperty(null);
    fetchMyProperties();
  };

  const handlePhotoUpload = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setShowPhotoUpload(true);
  };

  const handlePhotosUploaded = (newPhotos) => {
    fetchMyProperties(); // Refresh properties to show new photos
  };

  const handlePhotoUploadClose = () => {
    setShowPhotoUpload(false);
    setSelectedPropertyId(null);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading your properties...</p>
      </div>
    );
  }

  return (
    <div className="host-dashboard">
      <div className="dashboard-header">
        <div>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </button>
          <h1>Host Dashboard</h1>
        </div>
        <button className="add-property-btn" onClick={handleAddProperty}>
          <i className="fas fa-plus"></i>
          Add New Property
        </button>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-content">
              <h3>{properties.length}</h3>
              <p>Total Properties</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>{properties.filter(p => p.status === 'active').length}</h3>
              <p>Active Listings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="stat-content">
              <h3>₹0</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {properties.length === 0 ? (
          <div className="no-properties">
            <i className="fas fa-home"></i>
            <h3>No Properties Yet</h3>
            <p>Start by adding your first property to begin hosting guests.</p>
            <button className="add-first-property-btn" onClick={handleAddProperty}>
              <i className="fas fa-plus"></i>
              Add Your First Property
            </button>
          </div>
        ) : (
          <>
            <div className="content-header">
              <h2>My Properties</h2>
            </div>
            <div className="properties-grid">
              {properties.map(property => (
            <div key={property._id} className="property-card">
              <div className="property-image">
                {property.images && property.images.length > 0 ? (
                  <img src={property.images[0].url} alt={property.title} />
                ) : (
                  <div className="no-image">
                    <i className="fas fa-image"></i>
                  </div>
                )}
                <div className="property-status">
                  <span className={`status-badge ${property.status}`}>
                    {property.status}
                  </span>
                </div>
              </div>
              
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {property.location.city}, {property.location.state}
                </p>
                <p className="property-type">{property.type}</p>
                <p className="property-price">
                  ₹{property.pricing.basePrice}/night
                </p>
                
                <div className="property-stats">
                  <span><i className="fas fa-users"></i> {property.capacity.maxGuests}</span>
                  <span><i className="fas fa-star"></i> {property.ratings.average.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="property-actions">
                <button 
                  className="photo-btn"
                  onClick={() => handlePhotoUpload(property._id)}
                >
                  <i className="fas fa-camera"></i>
                  Photos
                </button>
                <button 
                  className="edit-btn"
                  onClick={() => handleEditProperty(property)}
                >
                  <i className="fas fa-edit"></i>
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(property._id)}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>

      {showAddForm && (
        <PropertyForm 
          property={editingProperty}
          onClose={handleFormClose}
        />
      )}

      {showPhotoUpload && (
        <PhotoUpload
          propertyId={selectedPropertyId}
          onPhotosUploaded={handlePhotosUploaded}
          onClose={handlePhotoUploadClose}
        />
      )}
    </div>
  );
};

// Property Form Component
const PropertyForm = ({ property, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'homestay',
    location: {
      address: '',
      city: '',
      state: ''
    },
    pricing: {
      basePrice: ''
    },
    capacity: {
      maxGuests: '',
      bedrooms: '',
      bathrooms: ''
    },
    amenities: []
  });
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        type: property.type || 'homestay',
        location: {
          address: property.location?.address || '',
          city: property.location?.city || '',
          state: property.location?.state || ''
        },
        pricing: {
          basePrice: property.pricing?.basePrice || ''
        },
        capacity: {
          maxGuests: property.capacity?.maxGuests || '',
          bedrooms: property.capacity?.bedrooms || '',
          bathrooms: property.capacity?.bathrooms || ''
        },
        amenities: property.amenities || []
      });
    }
  }, [property]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create clean property data object
      const propertyData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        location: {
          address: formData.location.address,
          city: formData.location.city,
          state: formData.location.state
        },
        pricing: {
          basePrice: Number(formData.pricing.basePrice)
        },
        capacity: {
          maxGuests: Number(formData.capacity.maxGuests)
        },
        amenities: formData.amenities
      };

      // Add optional capacity fields only if they have values
      if (formData.capacity.bedrooms) {
        propertyData.capacity.bedrooms = Number(formData.capacity.bedrooms);
      }
      if (formData.capacity.bathrooms) {
        propertyData.capacity.bathrooms = Number(formData.capacity.bathrooms);
      }

      console.log('Sending property data:', JSON.stringify(propertyData, null, 2));

      let savedProperty;
      if (property) {
        await propertyAPI.update(property._id, propertyData);
        savedProperty = property;
      } else {
        const response = await propertyAPI.create(propertyData);
        savedProperty = response.data;
      }

      // Upload photos if any were selected
      if (selectedPhotos.length > 0 && savedProperty._id) {
        const formData = new FormData();
        selectedPhotos.forEach(photo => {
          formData.append('photos', photo.file);
        });

        try {
          await fetch(`http://localhost:5000/api/photos/${savedProperty._id}/photos`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
          });
        } catch (photoError) {
          console.error('Photo upload error:', photoError);
          alert('Property created but photos failed to upload. You can add them later from dashboard.');
        }
      }

      onClose();
    } catch (error) {
      alert('Error saving property: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + selectedPhotos.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }

    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setSelectedPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setSelectedPhotos(prev => {
      const updated = prev.filter((_, i) => i !== index);
      // Clean up URL
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      selectedPhotos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, []);

  const amenityOptions = [
    { value: 'wifi', label: 'WiFi', icon: 'fas fa-wifi' },
    { value: 'parking', label: 'Parking', icon: 'fas fa-parking' },
    { value: 'kitchen', label: 'Kitchen', icon: 'fas fa-utensils' },
    { value: 'ac', label: 'AC', icon: 'fas fa-snowflake' },
    { value: 'tv', label: 'TV', icon: 'fas fa-tv' },
    { value: 'pool', label: 'Pool', icon: 'fas fa-swimming-pool' }
  ];

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="property-form" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{property ? 'Edit Property' : 'Add New Property'}</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <div className="form-section-title">
              <i className="fas fa-info-circle"></i>
              Basic Information
            </div>
            
            <div className="form-group">
              <label>Property Title <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g., Cozy 2BHK near Godavari Ghat"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                required
              />
            </div>

            <div className="form-group">
              <label>Description <span className="required">*</span></label>
              <textarea
                placeholder="Describe your property, its features, and what makes it special..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Property Type <span className="required">*</span></label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))}
                >
                  <option value="homestay">Homestay</option>
                  <option value="hotel">Hotel</option>
                  <option value="tent">Tent</option>
                  <option value="dormitory">Dormitory</option>
                </select>
              </div>

              <div className="form-group">
                <label>Base Price (₹/night) <span className="required">*</span></label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.pricing.basePrice}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, basePrice: e.target.value }
                  }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="form-section">
            <div className="form-section-title">
              <i className="fas fa-map-marker-alt"></i>
              Location Details
            </div>
            
            <div className="form-group">
              <label>Address <span className="required">*</span></label>
              <input
                type="text"
                placeholder="Street address, landmark"
                value={formData.location.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, address: e.target.value }
                }))}
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>City <span className="required">*</span></label>
                <input
                  type="text"
                  placeholder="e.g., Nashik"
                  value={formData.location.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>State <span className="required">*</span></label>
                <input
                  type="text"
                  placeholder="e.g., Maharashtra"
                  value={formData.location.state}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    location: { ...prev.location, state: e.target.value }
                  }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="form-section">
            <div className="form-section-title">
              <i className="fas fa-users"></i>
              Capacity
            </div>
            
            <div className="form-row-3">
              <div className="form-group">
                <label>Max Guests <span className="required">*</span></label>
                <input
                  type="number"
                  placeholder="e.g., 4"
                  min="1"
                  value={formData.capacity.maxGuests}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    capacity: { ...prev.capacity, maxGuests: e.target.value }
                  }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bedrooms</label>
                <input
                  type="number"
                  placeholder="Optional"
                  min="0"
                  value={formData.capacity.bedrooms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    capacity: { ...prev.capacity, bedrooms: e.target.value }
                  }))}
                />
              </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <input
                  type="number"
                  placeholder="Optional"
                  min="0"
                  value={formData.capacity.bathrooms}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    capacity: { ...prev.capacity, bathrooms: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="form-section">
            <div className="form-section-title">
              <i className="fas fa-star"></i>
              Amenities
            </div>
            
            <div className="amenities-grid">
              {amenityOptions.map(amenity => (
                <label key={amenity.value} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity.value)}
                    onChange={() => handleAmenityChange(amenity.value)}
                  />
                  <i className={amenity.icon}></i>
                  <span>{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className="form-section">
            <div className="form-section-title">
              <i className="fas fa-camera"></i>
              Property Photos
            </div>
            
            <div className="photo-upload-section">
              <input
                type="file"
                id="property-photos"
                multiple
                accept="image/*"
                onChange={handlePhotoSelect}
                className="file-input"
              />
              <label htmlFor="property-photos" className="photo-input-label">
                <i className="fas fa-cloud-upload-alt"></i>
                Click to upload photos (Max 5)
              </label>
              
              {selectedPhotos.length > 0 && (
                <div className="photo-previews-small">
                  {selectedPhotos.map((photo, index) => (
                    <div key={index} className="photo-preview-small">
                      <img src={photo.preview} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button" 
                        className="remove-photo-btn"
                        onClick={() => removePhoto(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="photo-note">
                <i className="fas fa-info-circle"></i>
                You can add more photos later from your dashboard
              </p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              <i className="fas fa-times"></i>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i>
                  {property ? 'Update Property' : 'Add Property'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostDashboard;