# Kumbhathon - Deployed Links

## Current Deployment Status

### Frontend (Vercel)
**URL:** https://kumbhthon-1wl8-pb7ii7nlh-chaitanya686s-projects.vercel.app

### Backend (To Deploy)
Follow these steps to deploy backend on Vercel:

1. Go to https://vercel.com/new
2. Import the SAME repository: `FinalKumbhProject`
3. Configure:
   - **Root Directory:** `BACKEND`
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
4. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://chaitanyaumbarkar971_db_user:7lKfsZCudGjF87KE@kumbhstays.7iyc2be.mongodb.net/kumbhathon?retryWrites=true&w=majority
   JWT_SECRET=kumbhathon_jwt_secret_key_2027_nashik
   JWT_EXPIRE=7d
   CLOUD_NAME=dgole5fjc
   CLOUD_API_KEY=193136391859254
   CLOUD_API_SECRET=TZ3GidxHv6nn8pAMofDYODqlPWQ
   NODE_ENV=production
   ```
5. Deploy
6. Copy backend URL (e.g., `https://kumbhthon-backend.vercel.app`)

### Update Frontend API URL

After backend is deployed, update:
`FRONTEND/KumbhathonApp/src/services/api.js`

Change:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_BASE_URL = 'https://YOUR-BACKEND-URL.vercel.app/api';
```

Then commit and push to auto-redeploy frontend.

## Final URLs (After Backend Deployment)
- **Frontend:** https://kumbhthon-1wl8-pb7ii7nlh-chaitanya686s-projects.vercel.app
- **Backend:** (Will be available after deployment)
- **Full App:** Frontend URL (connects to backend automatically)
