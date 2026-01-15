# Kumbhathon Backend API

## 🚀 REST API for Kumbh Mela Accommodation Platform

Built with Node.js, Express, and MongoDB following MVC architecture.

---

## 📁 Project Structure

```
BACKEND/
├── src/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Booking.js
│   │   └── Review.js
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   └── bookingController.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   └── bookingRoutes.js
│   ├── middleware/          # Auth & error handling
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/              # Configuration
│   │   └── database.js
│   └── utils/               # Helper functions
├── server.js                # Entry point
├── package.json
└── .env                     # Environment variables
```

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd BACKEND
npm install
```

### 2. Setup Environment Variables

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kumbhathon
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Install MongoDB

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Or use MongoDB Atlas (Cloud):**
- Create free account at https://www.mongodb.com/cloud/atlas
- Get connection string and update MONGODB_URI

### 4. Run Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Properties

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/properties` | Get all properties | Public |
| GET | `/api/properties/:id` | Get single property | Public |
| POST | `/api/properties` | Create property | Host/Admin |
| PUT | `/api/properties/:id` | Update property | Host/Admin |
| DELETE | `/api/properties/:id` | Delete property | Host/Admin |

### Bookings

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings` | Create booking | Private |
| GET | `/api/bookings/my-bookings` | Get user bookings | Private |
| GET | `/api/bookings/:id` | Get single booking | Private |
| PUT | `/api/bookings/:id` | Update booking | Private |
| DELETE | `/api/bookings/:id` | Cancel booking | Private |

---

## 📝 API Usage Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Properties

```bash
GET /api/properties?type=hotel&minPrice=1000&maxPrice=5000
```

### Create Booking

```bash
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "property": "property_id",
  "checkIn": "2027-01-15",
  "checkOut": "2027-01-20",
  "guests": 2
}
```

---

## 🔐 Authentication

API uses JWT (JSON Web Tokens) for authentication.

**Include token in headers:**
```
Authorization: Bearer <your_token>
```

---

## 🗄️ Database Models

### User
- name, email, password, role, phone, isVerified

### Property
- name, type, description, price, location, amenities, images, capacity, host, rating

### Booking
- property, user, checkIn, checkOut, guests, totalPrice, status, paymentStatus

### Review
- property, user, rating, comment

---

## 🔄 Connect with Frontend

Update frontend API calls to:
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## 🐛 Troubleshooting

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service (Windows)
net start MongoDB
```

**Port Already in Use:**
```bash
# Change PORT in .env file
PORT=5001
```

---

## 📦 Dependencies

```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "jsonwebtoken": "JWT authentication",
  "bcryptjs": "Password hashing",
  "cors": "CORS middleware",
  "dotenv": "Environment variables"
}
```

---

## 🚀 Deployment

Ready to deploy on:
- **Heroku**
- **Railway**
- **Render**
- **AWS EC2**

---

**Built with ❤️ for Kumbhathon 2027**
