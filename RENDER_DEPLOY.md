# Render Deployment Guide

## 🚀 Deploy to Render (Easy Way)

### Option 1: Using Render Blueprint (Recommended)

1. **Push your code to GitHub** ✓ (Already done!)

2. **Go to Render Dashboard**: https://dashboard.render.com

3. **Click "New" → "Blueprint"**

4. **Connect your GitHub repo**: `Seyi007/portfolio-project`

5. **Render will auto-detect** [`render.yaml`](render.yaml) and create both services

6. **Add these Environment Variables** in the Render dashboard:
   - For `portfolio-backend` service:
     ```
     SMTP_USERNAME = kuforiji98@gmail.com
     SMTP_PASSWORD = rvydgyxwomalersj
     ```

7. **Deploy!** Render will:
   - Build backend Docker image
   - Build frontend Docker image
   - Deploy both services
   - Give you live URLs

### Option 2: Manual Deployment (Step by Step)

#### Deploy Backend First:

1. **New Web Service** → Connect GitHub repo
2. **Settings**:
   - Name: `portfolio-backend`
   - Region: Frankfurt
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: Docker
   - Dockerfile Path: `./Dockerfile`
   - Instance Type: **Free**

3. **Environment Variables**:
   ```
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=kuforiji98@gmail.com
   SMTP_PASSWORD=rvydgyxwomalersj
   API_HOST=0.0.0.0
   API_PORT=8000
   ```

4. **Create Web Service** → Wait for deployment

5. **Copy your backend URL** (e.g., `https://portfolio-backend-xyz.onrender.com`)

#### Deploy Frontend:

1. **New Web Service** → Same repo
2. **Settings**:
   - Name: `portfolio-frontend`
   - Region: Frankfurt
   - Branch: `main`
   - Root Directory: `frontend`
   - Runtime: Docker
   - Dockerfile Path: `./Dockerfile`
   - Instance Type: **Free**

3. **Environment Variables**:
   ```
   VITE_API_URL=https://portfolio-backend-xyz.onrender.com
   ```
   ⚠️ Replace with YOUR actual backend URL from step 5!

4. **Create Web Service** → Wait for deployment

5. **Done!** Your portfolio is live! 🎉

## 📝 After Deployment

Your live URLs will be:
- **Frontend**: `https://portfolio-frontend-xyz.onrender.com`
- **Backend API**: `https://portfolio-backend-xyz.onrender.com`
- **API Docs**: `https://portfolio-backend-xyz.onrender.com/docs`

## ⚠️ Important Notes

- **Free tier sleeps after 15 min inactivity** - First request may be slow
- **Upgrade to Starter ($7/mo)** for 24/7 availability
- **Custom domain**: Add in Render dashboard settings
- **Auto-deploy**: Push to `main` branch = auto-deployment

## 🔄 Update Your Site

```bash
# Make changes locally
git add .
git commit -m "Update portfolio"
git push origin main

# Render auto-deploys! ✨
```

## 🐛 Troubleshooting

**Backend not starting:**
- Check Render logs: Dashboard → Service → Logs
- Verify environment variables are set

**Frontend can't reach backend:**
- Check `VITE_API_URL` points to correct backend URL
- Check backend CORS settings allow frontend origin

**CORS errors:**
Update [`backend/config/settings.py`](backend/config/settings.py) to include your frontend URL in `CORS_ORIGINS`
