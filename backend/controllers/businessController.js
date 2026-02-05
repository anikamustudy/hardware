const BusinessInfo = require('../models/BusinessInfo');

// Get business info
exports.getBusinessInfo = async (req, res) => {
  try {
    let businessInfo = await BusinessInfo.findOne();
    if (!businessInfo) {
      // Create default business info if not exists
      businessInfo = await BusinessInfo.create({
        name: 'Hardware Boutique',
        description: 'Your one-stop shop for all hardware needs',
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
      });
    }
    res.json(businessInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update business info (Admin only)
exports.updateBusinessInfo = async (req, res) => {
  try {
    let businessInfo = await BusinessInfo.findOne();
    if (!businessInfo) {
      businessInfo = new BusinessInfo(req.body);
    } else {
      Object.assign(businessInfo, req.body);
      businessInfo.updatedAt = Date.now();
    }
    await businessInfo.save();
    res.json(businessInfo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating business info', error: error.message });
  }
};
