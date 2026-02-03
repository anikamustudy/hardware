// Sample data seeding script
// Run this script to populate your database with sample data
// Usage: node scripts/seedData.js

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Review = require('../models/Review');
const BusinessInfo = require('../models/BusinessInfo');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: 'Claw Hammer',
    description: 'Professional grade 16oz claw hammer with ergonomic grip',
    price: 24.99,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    inStock: true,
    quantity: 50,
  },
  {
    name: 'Cordless Drill',
    description: '20V MAX cordless drill/driver kit with 2 batteries',
    price: 149.99,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    inStock: true,
    quantity: 25,
  },
  {
    name: 'Screwdriver Set',
    description: '10-piece precision screwdriver set with magnetic tips',
    price: 19.99,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    inStock: true,
    quantity: 100,
  },
  {
    name: 'Adjustable Wrench',
    description: '12-inch adjustable wrench with chrome finish',
    price: 14.99,
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    inStock: true,
    quantity: 75,
  },
  {
    name: 'Plumbing Pipe Set',
    description: 'PVC pipe fitting kit for standard plumbing projects',
    price: 34.99,
    category: 'Plumbing',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    inStock: true,
    quantity: 40,
  },
  {
    name: 'LED Light Bulbs (4-pack)',
    description: '60W equivalent LED bulbs, energy efficient',
    price: 12.99,
    category: 'Electrical',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c',
    inStock: true,
    quantity: 200,
  },
];

const sampleReviews = [
  {
    customerName: 'John Smith',
    rating: 5,
    comment: 'Excellent service and quality products! The staff was very helpful.',
    approved: true,
  },
  {
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Best hardware store in town! Great selection and competitive prices.',
    approved: true,
  },
  {
    customerName: 'Michael Brown',
    rating: 4,
    comment: 'Good variety of tools and supplies. The staff is knowledgeable.',
    approved: true,
  },
];

const businessInfo = {
  name: 'Hardware Boutique',
  description: 'Your one-stop shop for all hardware needs.',
  address: {
    street: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    country: 'USA',
  },
  coordinates: {
    lat: 39.7817,
    lng: -89.6501,
  },
  phone: '(555) 123-4567',
  email: 'info@hardwareboutique.com',
  hours: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: 'Closed',
  },
};

const adminUser = {
  username: 'admin',
  email: 'admin@hardwareboutique.com',
  password: 'admin123',
  role: 'admin',
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    await Product.deleteMany({});
    await Review.deleteMany({});
    await BusinessInfo.deleteMany({});
    
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      await User.deleteMany({ role: 'admin' });
    }

    await Product.insertMany(sampleProducts);
    await Review.insertMany(sampleReviews);
    await BusinessInfo.create(businessInfo);

    if (!existingAdmin) {
      await User.create(adminUser);
      console.log('Admin user created - Email:', adminUser.email, 'Password:', adminUser.password);
    }

    console.log('✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedDatabase();
});
