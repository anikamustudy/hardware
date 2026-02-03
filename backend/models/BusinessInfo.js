const mongoose = require('mongoose');

const BusinessInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Hardware Boutique',
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  phone: String,
  email: String,
  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
  logo: String,
  heroImage: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BusinessInfo', BusinessInfoSchema);
