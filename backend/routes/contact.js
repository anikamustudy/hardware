const express = require('express');
const router = express.Router();

// Contact form endpoint
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Here you would typically send an email or save to database
    // For now, just log and return success
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error sending message', 
      error: error.message 
    });
  }
});

module.exports = router;
