# 🚀 Backend Quick Start

## Run in 3 Steps!

### Step 1: Install Dependencies
```bash
cd D:\VSfiles\Kumbhthon\BACKEND
npm install
```

### Step 2: Install MongoDB

**Option A: Local MongoDB**
1. Download: https://www.mongodb.com/try/download/community
2. Install and start service

**Option B: MongoDB Atlas (Cloud - Recommended for Hackathon)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kumbhathon
   ```

### Step 3: Run Server
```bash
npm run dev
```

Server will start on: `http://localhost:5000`

---

## ✅ Test API

Open browser or Postman:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Kumbhathon API is running"
}
```

---

## 📡 API Base URL

```
http://localhost:5000/api
```

---

## 🔗 Connect Frontend

In your React app, use:
```javascript
const API_URL = 'http://localhost:5000/api';

// Example: Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

---

## 📝 Quick Test Endpoints

### 1. Register User
```bash
POST http://localhost:5000/api/auth/register
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Body: {
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Get Properties
```bash
GET http://localhost:5000/api/properties
```

---

**Backend is ready! 🎉**
