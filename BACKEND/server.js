const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database only if MongoDB URI is provided
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/aasray') {
  connectDB();
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', process.env.FRONTEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/properties', require('./src/routes/propertyRoutes'));
app.use('/api/photos', require('./src/routes/photoRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

// New accommodations route for filtering
app.use('/api/accommodations', require('./routes/accommodations'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Aasray API is running' });
});

// Test image upload page
app.get('/test-images', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-image.html'));
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
