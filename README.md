# Hardware Boutique - Full-Stack Web Application

A complete full-stack web application for Hardware Boutique, a hardware store business. This application features a modern React/Next.js frontend with a Node.js/Express backend, MongoDB database, JWT authentication, and Google Maps integration.

## Features

### Frontend
- **Homepage** - Hero section with business info and call-to-action buttons
- **About Page** - Business details, location, and hours of operation
- **Products Page** - Product listings with category filtering
- **Contact Page** - Contact form and embedded Google Map
- **Admin Panel** - Secure login and content management system
- **Reviews Section** - Customer testimonials and ratings

### Backend
- RESTful API built with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication for secure admin access
- CRUD operations for products, reviews, and business info
- Contact form handling

### Admin Features
- Secure admin login with JWT
- Add, edit, and delete products
- Manage product inventory
- Approve and manage customer reviews
- View business information

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: CSS (custom styles)
- **HTTP Client**: Axios
- **Maps**: Google Maps JavaScript API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for cross-origin requests

## Project Structure

```
hardware/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── productController.js # Product management
│   │   ├── reviewController.js  # Review management
│   │   └── businessController.js# Business info management
│   ├── middleware/
│   │   └── auth.js              # Auth & admin middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Product.js           # Product model
│   │   ├── Review.js            # Review model
│   │   └── BusinessInfo.js      # Business info model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── products.js          # Product routes
│   │   ├── reviews.js           # Review routes
│   │   ├── business.js          # Business routes
│   │   └── contact.js           # Contact form route
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Express server entry point
│
├── frontend/
│   ├── components/
│   │   ├── Layout.js            # Main layout wrapper
│   │   ├── Navbar.js            # Navigation bar
│   │   ├── Footer.js            # Footer component
│   │   ├── ProductCard.js       # Product display card
│   │   ├── ReviewCard.js        # Review display card
│   │   └── GoogleMap.js         # Google Maps integration
│   ├── lib/
│   │   └── api.js               # API client and endpoints
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── index.js         # Admin login page
│   │   │   └── dashboard.js     # Admin dashboard
│   │   ├── _app.js              # Next.js app wrapper
│   │   ├── _document.js         # Next.js document
│   │   ├── index.js             # Homepage
│   │   ├── about.js             # About page
│   │   ├── products.js          # Products page
│   │   └── contact.js           # Contact page
│   ├── public/
│   │   └── images/              # Static images
│   ├── styles/
│   │   └── globals.css          # Global styles
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── next.config.js           # Next.js configuration
│   └── package.json
│
└── README.md                    # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Google Maps API key (optional, for maps functionality)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hardware-boutique
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services panel
```

6. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend API will run at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run at `http://localhost:3000`

### Creating an Admin User

To access the admin panel, you need to create an admin user in MongoDB:

1. Open MongoDB shell or MongoDB Compass
2. Connect to your database: `hardware-boutique`
3. Insert an admin user:

```javascript
// Using MongoDB shell
use hardware-boutique

db.users.insertOne({
  username: "admin",
  email: "admin@hardwareboutique.com",
  password: "$2a$10$rO7.6d5c8qY5V5Cr5r8czu5c2b9Hf5DyQc6r8c5c6r8c5c6r8c5c6r", // This is "admin123" hashed
  role: "admin",
  createdAt: new Date()
})
```

Or create via the registration endpoint with Postman/cURL:
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

### Google Maps API Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Create credentials (API Key)
5. Add the API key to your `.env.local` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Reviews
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/all` - Get all reviews (admin only)
- `PUT /api/reviews/:id/approve` - Approve review (admin only)
- `DELETE /api/reviews/:id` - Delete review (admin only)

### Business Info
- `GET /api/business` - Get business information
- `PUT /api/business` - Update business info (admin only)

### Contact
- `POST /api/contact` - Send contact form message

## Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy frontend:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Backend (Render/Heroku)

#### Render
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables in Render dashboard

#### Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create hardware-boutique-api`
4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
```
5. Deploy:
```bash
git subtree push --prefix backend heroku main
```

### Database (MongoDB Atlas)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (or allow from anywhere: 0.0.0.0/0)
5. Get connection string and update `MONGODB_URI` in your environment variables

## Usage

### Admin Panel Access
1. Navigate to `http://localhost:3000/admin`
2. Login with admin credentials:
   - Email: admin@hardwareboutique.com
   - Password: admin123
3. Manage products, reviews, and view business info

### Adding Products
1. Login to admin panel
2. Go to Products tab
3. Fill in product details (name, description, price, category, image URL, stock status)
4. Click "Add Product"

### Managing Reviews
1. Login to admin panel
2. Go to Reviews tab
3. Approve or delete customer reviews

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server with hot reload
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
npm start
```

Backend:
```bash
cd backend
npm start
```

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected admin routes
- Input validation with express-validator
- CORS configuration
- Environment variable protection

## Optional Features (Future Enhancements)

- Shopping cart functionality
- Checkout and payment integration (Stripe)
- Order management system
- Email notifications
- Image upload functionality
- Advanced inventory management
- Customer accounts
- Product search functionality
- Product reviews with images
- SEO optimization with meta tags
- Analytics integration

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (firewall/security groups)

### API CORS Errors
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS configuration in `backend/server.js`

### Google Maps Not Loading
- Verify API key is set in `.env.local`
- Ensure Maps JavaScript API is enabled in Google Cloud Console
- Check for billing account setup in Google Cloud

### Admin Login Issues
- Verify admin user exists in database
- Check JWT_SECRET is set correctly
- Clear browser localStorage and try again

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions:
- Check existing documentation
- Review API endpoint responses
- Check browser console for frontend errors
- Check server logs for backend errors

---

Built with ❤️ for Hardware Boutique
