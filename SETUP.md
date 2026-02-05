# Hardware Boutique - Setup Guide

This guide will walk you through setting up the Hardware Boutique application from scratch.

## Quick Start

### Option 1: Automated Setup (Recommended)

Coming soon: Setup script for one-command installation

### Option 2: Manual Setup

Follow these steps to set up the application manually:

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd hardware
```

## Step 2: Backend Setup

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hardware-boutique
JWT_SECRET=your_very_secure_secret_key_change_this
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a long, random string in production!

### Setup MongoDB

#### Option A: Local MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

#### Option B: MongoDB Atlas (Cloud)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Create a database user
5. Whitelist your IP (or use 0.0.0.0/0 for development)
6. Get your connection string
7. Update `MONGODB_URI` in `.env`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hardware-boutique?retryWrites=true&w=majority
```

### Start the Backend Server

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

Test the API:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","message":"Hardware Boutique API is running"}
```

## Step 3: Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

### Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Note**: Google Maps API key is optional but recommended for full functionality.

### Start the Frontend

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Step 4: Create Admin User

You need an admin account to access the admin panel.

### Method 1: Using cURL

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@hardwareboutique.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Method 2: Using MongoDB Shell

```bash
mongosh
```

Then run:
```javascript
use hardware-boutique

db.users.insertOne({
  username: "admin",
  email: "admin@hardwareboutique.com",
  // Pre-hashed password for "admin123"
  password: "$2a$10$YourHashedPasswordHere",
  role: "admin",
  createdAt: new Date()
})
```

**Note**: You'll need to hash the password first or use the API endpoint.

### Method 3: Using Postman

1. Open Postman
2. Create a POST request to `http://localhost:5000/api/auth/register`
3. Set Headers: `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "username": "admin",
  "email": "admin@hardwareboutique.com",
  "password": "admin123",
  "role": "admin"
}
```
5. Send the request

## Step 5: Seed Sample Data (Optional)

### Add Sample Products

You can add sample products via the admin panel or API:

```bash
# Example: Add a hammer
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Claw Hammer",
    "description": "Professional grade 16oz claw hammer",
    "price": 24.99,
    "category": "Tools",
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c",
    "inStock": true,
    "quantity": 50
  }'
```

To get your JWT token, login first:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hardwareboutique.com",
    "password": "admin123"
  }'
```

### Add Sample Reviews

```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "rating": 5,
    "comment": "Excellent service and quality products! Highly recommend."
  }'
```

## Step 6: Get Google Maps API Key (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Maps JavaScript API"
4. Go to "Credentials"
5. Click "Create Credentials" → "API Key"
6. Copy the API key
7. Add it to `frontend/.env.local`

**Security Note**: Restrict your API key to your domain in production!

## Step 7: Verify Installation

### Backend Verification

Test all endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Get business info
curl http://localhost:5000/api/business

# Get products
curl http://localhost:5000/api/products

# Get reviews
curl http://localhost:5000/api/reviews
```

### Frontend Verification

1. Visit `http://localhost:3000` - Homepage should load
2. Click "Products" - Products page should display
3. Click "About" - About page with business info
4. Click "Contact" - Contact form should be visible
5. Visit `http://localhost:3000/admin` - Admin login page

### Admin Panel Verification

1. Login with admin credentials
2. Try adding a product
3. Try approving a review
4. Check business information tab

## Common Issues and Solutions

### Issue: MongoDB Connection Failed

**Solution:**
- Check if MongoDB is running: `mongosh` (should connect)
- Verify connection string in `.env`
- Check firewall settings
- For Atlas: Check IP whitelist

### Issue: Frontend Can't Connect to Backend

**Solution:**
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors
- Ensure no other service is using port 5000

### Issue: Google Maps Not Loading

**Solution:**
- Verify API key in `.env.local`
- Check Maps JavaScript API is enabled
- Check API key restrictions
- Open browser console for error messages

### Issue: Admin Login Not Working

**Solution:**
- Verify admin user exists in database
- Check credentials match exactly
- Clear browser localStorage
- Check JWT_SECRET is set in backend `.env`
- Verify token is being sent in requests

### Issue: Port Already in Use

**Solution:**
```bash
# Find process using the port
lsof -ti:5000  # or 3000 for frontend
# Kill the process
kill -9 <PID>
```

Or change the port in configuration files.

## Next Steps

After successful setup:

1. **Customize Business Info**: Update business details in the admin panel
2. **Add Products**: Add your product inventory
3. **Configure Maps**: Set correct coordinates for your location
4. **Customize Styling**: Modify `frontend/styles/globals.css`
5. **Add Content**: Add images to `frontend/public/images`
6. **Deploy**: Follow deployment guide for production

## Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Auto-restarts on file changes
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot reload enabled
```

### Making Changes

1. Backend changes: Edit files in `backend/`
2. Frontend changes: Edit files in `frontend/`
3. Test changes locally
4. Commit changes with git
5. Deploy to production

## Production Deployment

See main README.md for detailed deployment instructions for:
- Vercel (Frontend)
- Render/Heroku (Backend)
- MongoDB Atlas (Database)

## Getting Help

- Check the main README.md
- Review API documentation
- Check console logs (backend and frontend)
- Review MongoDB logs
- Check Network tab in browser DevTools

---

Happy coding! 🚀
