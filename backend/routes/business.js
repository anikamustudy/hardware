const express = require('express');
const router = express.Router();
const {
  getBusinessInfo,
  updateBusinessInfo,
} = require('../controllers/businessController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public route
router.get('/', getBusinessInfo);

// Admin route
router.put('/', authMiddleware, adminMiddleware, updateBusinessInfo);

module.exports = router;
