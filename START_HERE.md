# 🚀 Getting Started with Hardware Boutique

Welcome! This guide will get you up and running in minutes.

## 📋 What You Have

A complete full-stack web application including:
- ✅ Backend API (Node.js + Express + MongoDB)
- ✅ Frontend Website (React + Next.js)
- ✅ Admin Panel for content management
- ✅ Sample data and documentation

## 🎯 Choose Your Path

### Option 1: Quick Start (Recommended)
**Time: 5 minutes** | **Difficulty: Easy** | **Best for: First-time users**

Follow the [QUICKSTART.md](QUICKSTART.md) guide for a fast setup.

### Option 2: Detailed Setup
**Time: 15 minutes** | **Difficulty: Intermediate** | **Best for: Understanding the system**

Follow the [SETUP.md](SETUP.md) guide for step-by-step instructions.

### Option 3: Jump Right In
**Time: 2 minutes** | **Difficulty: Advanced** | **Best for: Experienced developers**

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev

# Frontend (in new terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Visit: http://localhost:3000

## 📖 Documentation Guide

Choose the right document for your needs:

### For Setup and Installation
1. **[QUICKSTART.md](QUICKSTART.md)** - Fastest way to get started (5 min)
2. **[SETUP.md](SETUP.md)** - Detailed installation guide (15 min)
3. **[README.md](README.md)** - Complete documentation (comprehensive)

### For Understanding the Project
1. **[SUMMARY.md](SUMMARY.md)** - What was built and why
2. **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Architecture and design
3. **[README.md](README.md)** - Full project details

### For Development
1. **[API.md](API.md)** - Complete API reference
2. **[TESTING.md](TESTING.md)** - Testing checklist
3. **[README.md](README.md)** - Development workflow

## 🎬 Demo Credentials

Once set up, login to the admin panel:
- URL: http://localhost:3000/admin
- Email: `admin@hardwareboutique.com`
- Password: `admin123`

## ❓ Common Questions

### "Where do I start?"
Start with [QUICKSTART.md](QUICKSTART.md) for the fastest setup.

### "How do I customize the website?"
1. Update business info via admin panel
2. Add your products via admin panel
3. Modify styles in `frontend/styles/globals.css`

### "How do I deploy this?"
See the "Deployment" section in [README.md](README.md) for:
- Vercel (frontend)
- Render/Heroku (backend)
- MongoDB Atlas (database)

### "What if something doesn't work?"
1. Check [SETUP.md](SETUP.md) troubleshooting section
2. Review [TESTING.md](TESTING.md) checklist
3. Verify MongoDB is running
4. Check environment variables

## 🎯 Quick Navigation

### I want to...

#### ...get started immediately
→ [QUICKSTART.md](QUICKSTART.md)

#### ...understand what was built
→ [SUMMARY.md](SUMMARY.md)

#### ...see the complete documentation
→ [README.md](README.md)

#### ...learn about the API
→ [API.md](API.md)

#### ...test my installation
→ [TESTING.md](TESTING.md)

#### ...deploy to production
→ [README.md](README.md) - Deployment section

#### ...understand the architecture
→ [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)

## 🔑 Key Files

### Backend
- `backend/server.js` - Main server file
- `backend/.env` - Configuration (create from .env.example)
- `backend/scripts/seedData.js` - Sample data

### Frontend
- `frontend/pages/index.js` - Homepage
- `frontend/.env.local` - Configuration (create from .env.example)
- `frontend/styles/globals.css` - Styling

## 📊 Project Stats

- **Backend Files**: 21
- **Frontend Files**: 22
- **Documentation**: 8 guides
- **API Endpoints**: 15+
- **Pages**: 7
- **Components**: 6

## 🎉 You're Ready!

Pick a guide above and start building your Hardware Boutique website!

---

**Need Help?** Check the documentation files listed above or review the troubleshooting sections.

**Happy Building!** 🔨
