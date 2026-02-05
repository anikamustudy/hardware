const express = require('express');
const router = express.Router();
const {
  getApprovedReviews,
  getAllReviews,
  createReview,
  approveReview,
  deleteReview,
} = require('../controllers/reviewController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes
router.get('/', getApprovedReviews);
router.post('/', createReview);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, getAllReviews);
router.put('/:id/approve', authMiddleware, adminMiddleware, approveReview);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReview);

module.exports = router;
