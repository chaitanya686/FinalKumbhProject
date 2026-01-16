// Mock Location Service for Testing
const API_BASE_URL = 'https://finalkumbhproject.onrender.com/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const mockLocationService = {
  // Mock location near Nashik for testing
  getCurrentLocation: () => {
    return new Promise((resolve) => {
      // Mock coordinates near Nashik (within 50km radius)
      const mockLocation = {
        latitude: 19.9975 + (Math.random() - 0.5) * 0.1, // Small random offset
        longitude: 73.7898 + (Math.random() - 0.5) * 0.1,
        accuracy: 10
      };
      
      setTimeout(() => resolve(mockLocation), 1000); // Simulate delay
    });
  },

  verifyLocation: async (latitude, longitude) => {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/verify-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ latitude, longitude })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export const mockPhotoService = {
  uploadPhotos: async (propertyId, files, location, caption = '') => {
    try {
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('photos', file);
      });
      
      if (location) {
        formData.append('latitude', location.latitude);
        formData.append('longitude', location.longitude);
      }
      
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await fetch(`${API_BASE_URL}/photos/${propertyId}/photos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  deletePhoto: async (propertyId, photoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${propertyId}/photos/${photoId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
};