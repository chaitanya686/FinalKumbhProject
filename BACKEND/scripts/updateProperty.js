require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../src/models/Property');

const updateProperty = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const propertyId = '696882ea22e176127af92cfc';
    const cloudinaryUrl = 'https://res.cloudinary.com/dgole5fjc/image/upload/v1/kumbhthon/WhatsApp_Image_2026-01-16_at_11.14.01_AM_ugsqcx.jpg';
    
    const property = await Property.findByIdAndUpdate(
      propertyId,
      {
        title: 'Luxury Hotel Near Kumbh',
        images: [{
          url: cloudinaryUrl,
          caption: 'Hotel View',
          publicId: 'kumbhthon/WhatsApp_Image_2026-01-16_at_11.14.01_AM_ugsqcx'
        }]
      },
      { new: true }
    );

    console.log('Updated property:', property.title);
    console.log('Image URL:', property.images[0].url);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateProperty();
