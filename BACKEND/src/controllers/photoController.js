const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isWithinKumbhArea, getLocationName } = require('../utils/locationVerification');
const Property = require('../models/Property');

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;
};

let cloudinary, CloudinaryStorage;

// Configure Cloudinary only if credentials are available
if (isCloudinaryConfigured()) {
  cloudinary = require('cloudinary').v2;
  CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// Configure storage (Cloudinary or local)
const storage = isCloudinaryConfigured()
  ? new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'kumbhthon',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
      ]
    }
  })
  : multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../../uploads/properties');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @desc    Verify location before upload
// @route   POST /api/properties/verify-location
// @access  Private
exports.verifyLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: 'Location coordinates are required'
      });
    }

    const verification = isWithinKumbhArea(latitude, longitude);
    const locationName = getLocationName(latitude, longitude);

    if (!verification.isValid) {
      return res.status(403).json({
        success: false,
        message: `Property must be within ${verification.maxDistance}km of Nashik for Kumbh Mela. Your location is ${verification.distance}km away.`,
        data: {
          isValid: false,
          distance: verification.distance,
          maxDistance: verification.maxDistance,
          locationName
        }
      });
    }

    res.json({
      success: true,
      message: 'Location verified successfully',
      data: {
        isValid: true,
        distance: verification.distance,
        locationName,
        coordinates: { latitude, longitude }
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload property photos
// @route   POST /api/properties/:id/photos
// @access  Private (Host only)
exports.uploadPhotos = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user owns the property
    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to upload photos for this property' });
    }

    // Verify location again during upload
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
      const verification = isWithinKumbhArea(latitude, longitude);
      if (!verification.isValid) {
        return res.status(403).json({
          message: 'Location verification failed. Property must be within Kumbh Mela area.'
        });
      }
    }

    // Process uploaded files
    const uploadedImages = req.files.map(file => {
      let imageUrl;
      let publicId;

      if (isCloudinaryConfigured()) {
        // multer-storage-cloudinary may populate different fields depending on version;
        // prefer full URL fields if available, otherwise build a secure URL from public id.
        imageUrl = file.path || file.secure_url || file.url;
        publicId = file.public_id || file.filename;
        if (!imageUrl && cloudinary && publicId) {
          try {
            imageUrl = cloudinary.url(publicId, { secure: true });
          } catch (e) {
            imageUrl = '';
          }
        }
      } else {
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/properties/${file.filename}`;
        publicId = file.filename;
      }

      return {
        url: imageUrl,
        caption: req.body.caption || '',
        publicId: publicId
      };
    });

    // Add images to property
    property.images = [...(property.images || []), ...uploadedImages];
    await property.save();

    res.json({
      success: true,
      message: 'Photos uploaded successfully',
      data: {
        images: uploadedImages,
        totalImages: property.images.length
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete property photo
// @route   DELETE /api/properties/:id/photos/:photoId
// @access  Private (Host only)
exports.deletePhoto = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const photoIndex = property.images.findIndex(img => img._id.toString() === req.params.photoId);

    if (photoIndex === -1) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const photo = property.images[photoIndex];

    // Delete from storage
    if (isCloudinaryConfigured() && photo.publicId) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(photo.publicId);
    } else if (!isCloudinaryConfigured() && photo.publicId) {
      // Delete local file
      const filePath = path.join(__dirname, '../../uploads/properties', photo.publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove from property
    property.images.splice(photoIndex, 1);
    await property.save();

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload,
  verifyLocation: exports.verifyLocation,
  uploadPhotos: exports.uploadPhotos,
  deletePhoto: exports.deletePhoto
};