# Hardware Boutique - Project Overview

## 📋 Project Summary

**Name:** Hardware Boutique Web Application
**Type:** Full-Stack E-commerce Website
**Purpose:** Online presence for a hardware store with product catalog, customer reviews, and admin management

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (Next.js + React)                         │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Home   │  │  Products │  │  About   │  │  Contact │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│  ┌──────────────────────────────────────┐                  │
│  │         Admin Dashboard               │                  │
│  │  - Products  - Reviews  - Business    │                  │
│  └──────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                          Backend                             │
│                   (Node.js + Express)                        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │ Products │  │  Reviews │  │ Business │  │
│  │   API    │  │   API    │  │   API    │  │   API    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│  ┌──────────────────────────────────────┐                  │
│  │     JWT Authentication                │                  │
│  │     Middleware & Security             │                  │
│  └──────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         Database                             │
│                         (MongoDB)                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Users   │  │ Products │  │  Reviews │  │ Business │  │
│  │Collection│  │Collection│  │Collection│  │   Info   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Key Features

### Public Features
- **Homepage**: Hero section, featured products, customer reviews
- **Product Catalog**: Browse products by category with filtering
- **About Page**: Business information, hours, location with Google Maps
- **Contact Form**: Send messages to business owner
- **Reviews Display**: Show customer testimonials and ratings

### Admin Features
- **Secure Login**: JWT-based authentication
- **Product Management**: Create, read, update, delete products
- **Review Moderation**: Approve or delete customer reviews
- **Inventory Tracking**: Manage stock levels and quantities
- **Business Info**: View and update business details

### Technical Features
- **RESTful API**: Clean, documented API endpoints
- **Authentication**: JWT tokens for secure admin access
- **Password Security**: Bcrypt hashing for passwords
- **Responsive Design**: Mobile-friendly interface
- **Google Maps Integration**: Interactive location maps
- **Data Validation**: Input validation and error handling

## 📦 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with SSR |
| React | 18.x | UI library |
| Axios | 1.6.x | HTTP client |
| Google Maps API | Latest | Map integration |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | Runtime environment |
| Express | 4.x | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 7.x | ODM for MongoDB |
| JWT | 9.x | Authentication tokens |
| Bcryptjs | 2.x | Password hashing |

## 📁 Project Structure

```
hardware/
├── backend/              # Backend API
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── scripts/         # Utility scripts (seeding)
│   └── server.js        # Entry point
│
├── frontend/            # Frontend application
│   ├── components/      # Reusable components
│   ├── lib/            # API client & utilities
│   ├── pages/          # Next.js pages
│   │   ├── admin/      # Admin panel
│   │   ├── index.js    # Homepage
│   │   ├── about.js    # About page
│   │   ├── products.js # Products page
│   │   └── contact.js  # Contact page
│   ├── public/         # Static assets
│   └── styles/         # CSS styles
│
└── docs/               # Documentation
    ├── README.md       # Main documentation
    ├── SETUP.md        # Setup guide
    ├── API.md          # API documentation
    ├── QUICKSTART.md   # Quick start guide
    └── TESTING.md      # Testing checklist
```

## 🔄 Data Flow

### User Views Products
```
Browser → GET /products → Next.js Page → API Call → Express → MongoDB → Response
```

### Admin Adds Product
```
Admin Panel → POST /products + JWT → Express (verify token) → MongoDB → Response
```

### Customer Submits Review
```
Contact Form → POST /reviews → Express → MongoDB (pending) → Response
```

## 🔐 Security Features

1. **Password Hashing**: All passwords hashed with bcrypt
2. **JWT Tokens**: Secure authentication with expiration
3. **Admin Middleware**: Protected admin-only routes
4. **Input Validation**: Server-side validation with express-validator
5. **CORS**: Configured for specific origins
6. **Environment Variables**: Sensitive data in .env files

## 🚀 Deployment Architecture

```
┌──────────────────┐
│   Vercel         │  ← Frontend (Next.js)
│   (CDN + SSR)    │
└──────────────────┘
         │
         │ API Calls
         ▼
┌──────────────────┐
│ Render/Heroku    │  ← Backend (Express)
│ (Node.js Server) │
└──────────────────┘
         │
         │ Database Connection
         ▼
┌──────────────────┐
│ MongoDB Atlas    │  ← Database (Cloud)
│ (Managed DB)     │
└──────────────────┘
```

## 📊 Database Schema

### Users Collection
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/user),
  createdAt: Date
}
```

### Products Collection
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String (URL),
  inStock: Boolean,
  quantity: Number,
  createdAt: Date
}
```

### Reviews Collection
```javascript
{
  customerName: String,
  rating: Number (1-5),
  comment: String,
  date: Date,
  approved: Boolean
}
```

### BusinessInfo Collection
```javascript
{
  name: String,
  description: String,
  address: {
    street, city, state, zip, country
  },
  coordinates: { lat, lng },
  phone: String,
  email: String,
  hours: {
    monday-sunday: String
  },
  updatedAt: Date
}
```

## 🔧 Development Workflow

1. **Setup**: Install dependencies, configure environment
2. **Seed**: Populate database with sample data
3. **Develop**: Run dev servers for backend and frontend
4. **Test**: Use testing checklist to verify functionality
5. **Build**: Create production builds
6. **Deploy**: Deploy to hosting platforms

## 📈 Future Enhancements

- [ ] Shopping cart functionality
- [ ] Payment processing (Stripe)
- [ ] Order management
- [ ] Email notifications
- [ ] Product search
- [ ] Image upload
- [ ] Customer accounts
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Multi-language support

## 📞 Support & Resources

- **README.md**: Complete setup and usage guide
- **SETUP.md**: Detailed installation instructions
- **API.md**: Full API endpoint documentation
- **QUICKSTART.md**: 5-minute setup guide
- **TESTING.md**: Comprehensive testing checklist

---

**Project Status**: ✅ Complete and Production-Ready

**License**: MIT

**Created for**: Hardware Boutique Business
