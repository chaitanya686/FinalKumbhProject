require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../src/models/Property');

const checkProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const properties = await Property.find();
    console.log(`Found ${properties.length} properties\n`);

    properties.forEach(prop => {
      console.log(`Property: ${prop.title}`);
      console.log(`ID: ${prop._id}`);
      console.log(`Type: ${prop.type}`);
      console.log(`Images: ${prop.images?.length || 0}`);
      if (prop.images?.length > 0) {
        prop.images.forEach((img, idx) => {
          console.log(`  Image ${idx + 1}: ${img.url}`);
        });
      }
      console.log('---\n');
    });

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkProperties();
