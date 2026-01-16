# Kumbhathon Deployment Guide

## Full Stack Deployment

### Backend Deployment (Vercel/Render)

#### Option 1: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to BACKEND folder: `cd BACKEND`
3. Run: `vercel`
4. Follow prompts and deploy
5. Copy the deployment URL

#### Option 2: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set:
   - Root Directory: `BACKEND`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables from .env
6. Deploy

### Frontend Deployment (Netlify/Vercel)

#### Option 1: Netlify
1. Go to https://netlify.com
2. Connect GitHub repository
3. Netlify will auto-detect netlify.toml
4. Update API URL in `FRONTEND/KumbhathonApp/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'YOUR_BACKEND_URL/api';
   ```
5. Deploy

#### Option 2: GitHub Pages (Static Only)
- Already configured with GitHub Actions
- Will deploy automatically on push to main
- URL: https://chaitanya686.github.io/Kumbh/

### Environment Variables for Backend

Required on hosting platform:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEURL=your_frontend_url
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

### Post-Deployment Steps

1. Update CORS in backend server.js with frontend URL
2. Update API_BASE_URL in frontend with backend URL
3. Test all features
4. Monitor logs for errors
