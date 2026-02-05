# Hardware Boutique - Quick Start Guide

Get your Hardware Boutique website running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB installed (local) OR MongoDB Atlas account (cloud)
- [ ] Git installed

## Quick Setup (5 Steps)

### Step 1: Install Backend Dependencies (1 min)

```bash
cd backend
npm install
```

### Step 2: Configure Backend Environment (1 min)

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings (use any text editor)
# Minimum required:
# - MONGODB_URI (keep default if using local MongoDB)
# - JWT_SECRET (change to any random string)
```

**Quick .env setup:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hardware-boutique
JWT_SECRET=your_random_secret_string_here
NODE_ENV=development
```

### Step 3: Seed Database with Sample Data (30 sec)

```bash
# Make sure MongoDB is running, then:
npm run seed
```

This will create:
- 6 sample products
- 3 customer reviews
- Business information
- Admin user (email: admin@hardwareboutique.com, password: admin123)

### Step 4: Start Backend Server (30 sec)

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

Leave this terminal open and running.

### Step 5: Setup & Start Frontend (2 min)

Open a NEW terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

**Done!** 🎉

Open http://localhost:3000 in your browser

## Admin Panel Access

1. Visit: http://localhost:3000/admin
2. Login with:
   - Email: `admin@hardwareboutique.com`
   - Password: `admin123`

## What's Included?

### Frontend (Next.js)
- ✅ Homepage with hero section
- ✅ About page
- ✅ Products page with filtering
- ✅ Contact page with form
- ✅ Admin dashboard
- ✅ Google Maps integration (needs API key)

### Backend (Express + MongoDB)
- ✅ RESTful API
- ✅ JWT Authentication
- ✅ Product management
- ✅ Review management
- ✅ Business info management
- ✅ Contact form handling

## Next Steps

### 1. Add Google Maps API Key (Optional)

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Get key from: https://console.cloud.google.com/

### 2. Customize Business Info

1. Login to admin panel
2. View current business info
3. Update via API or directly in MongoDB

### 3. Add More Products

Use the admin panel to add your own products!

### 4. Customize Styling

Edit `frontend/styles/globals.css` to match your brand

## Troubleshooting

### "MongoDB connection error"
- Make sure MongoDB is running:
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`
  - Windows: Start MongoDB service

### "Port 5000 already in use"
- Change PORT in `backend/.env` to 5001
- Update `frontend/.env.local` API_URL to match

### "Cannot find module..."
- Run `npm install` in the directory with the error

### Admin login not working
- Make sure you ran `npm run seed` in backend
- Check MongoDB is running
- Clear browser localStorage and try again

## Production Deployment

See README.md for detailed deployment instructions for:
- **Frontend**: Vercel
- **Backend**: Render or Heroku
- **Database**: MongoDB Atlas

## Support

Check these files for more info:
- `README.md` - Complete documentation
- `SETUP.md` - Detailed setup guide
- `API.md` - API documentation

---

**Happy Building!** 🔨
