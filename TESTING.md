# Hardware Boutique - Testing Checklist

Use this checklist to verify your installation is working correctly.

## Backend API Tests

### Health Check
```bash
curl http://localhost:5000/api/health
```
✅ Expected: `{"status":"ok","message":"Hardware Boutique API is running"}`

### Get Business Info
```bash
curl http://localhost:5000/api/business
```
✅ Expected: Business information JSON with address, hours, phone, etc.

### Get Products
```bash
curl http://localhost:5000/api/products
```
✅ Expected: Array of products (should have 6+ items after seeding)

### Get Reviews
```bash
curl http://localhost:5000/api/reviews
```
✅ Expected: Array of approved reviews (should have 3+ items after seeding)

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hardwareboutique.com","password":"admin123"}'
```
✅ Expected: User object with JWT token

## Frontend Tests

### Homepage
- [ ] Visit http://localhost:3000
- [ ] Hero section displays
- [ ] Navigation menu works
- [ ] Featured products display (6 products)
- [ ] Customer reviews display (3 reviews)
- [ ] Call-to-action buttons are visible

### About Page
- [ ] Visit http://localhost:3000/about
- [ ] Business information displays
- [ ] Store hours display
- [ ] Address information shows
- [ ] Map placeholder or Google Map displays

### Products Page
- [ ] Visit http://localhost:3000/products
- [ ] All products display in grid
- [ ] Category filter buttons appear
- [ ] Clicking category filter works
- [ ] Product cards show name, price, description
- [ ] In Stock status displays

### Contact Page
- [ ] Visit http://localhost:3000/contact
- [ ] Contact form displays
- [ ] Business contact info shows
- [ ] Map placeholder or Google Map displays
- [ ] Form fields: Name, Email, Message
- [ ] Submit button present

### Admin Login
- [ ] Visit http://localhost:3000/admin
- [ ] Login form displays
- [ ] Demo credentials shown
- [ ] Can login with admin@hardwareboutique.com / admin123
- [ ] Redirects to dashboard after successful login

### Admin Dashboard
- [ ] After login, dashboard displays
- [ ] Three tabs visible: Products, Reviews, Business Info
- [ ] Logout button present

#### Products Tab
- [ ] Products list displays
- [ ] Add Product form visible
- [ ] Can fill out form (name, price, category, etc.)
- [ ] "Add Product" button works
- [ ] Edit button on existing products
- [ ] Delete button on existing products
- [ ] Can edit a product
- [ ] Can delete a product (with confirmation)

#### Reviews Tab
- [ ] Reviews list displays
- [ ] Shows customer name, rating, comment
- [ ] Approve button for pending reviews
- [ ] Delete button for reviews
- [ ] Can approve a review
- [ ] Can delete a review

#### Business Info Tab
- [ ] Business information displays
- [ ] Shows name, description, address
- [ ] Shows phone and email

## Integration Tests

### Create Product via Admin Panel
1. [ ] Login to admin panel
2. [ ] Go to Products tab
3. [ ] Fill out product form:
   - Name: "Test Wrench"
   - Price: 15.99
   - Category: "Tools"
   - Description: "Test product"
   - Image URL: https://images.unsplash.com/photo-1504148455328-c376907d081c
   - In Stock: checked
   - Quantity: 10
4. [ ] Click "Add Product"
5. [ ] Product appears in list
6. [ ] Visit products page (frontend)
7. [ ] New product visible on products page

### Submit Review via Contact Form
1. [ ] Visit contact page
2. [ ] Fill out form:
   - Name: "Test User"
   - Email: "test@test.com"
   - Message: "This is a test message"
3. [ ] Submit form
4. [ ] Success message displays

### Category Filtering
1. [ ] Visit products page
2. [ ] Note total number of products
3. [ ] Click "Tools" category filter
4. [ ] Only tools display
5. [ ] Click "All Products"
6. [ ] All products display again

## Google Maps Integration Test

### Prerequisites
- [ ] Google Maps API key added to frontend/.env.local

### Tests
- [ ] Visit about page - map loads with marker
- [ ] Visit contact page - map loads with marker
- [ ] No console errors related to Maps API
- [ ] Map is interactive (can zoom, pan)

## Error Handling Tests

### Invalid Login
1. [ ] Try logging in with wrong password
2. [ ] Error message displays
3. [ ] Does not redirect

### Unauthorized Admin Access
1. [ ] Logout if logged in
2. [ ] Try accessing http://localhost:3000/admin/dashboard directly
3. [ ] Redirects to login page

### API Error Handling
```bash
# Try to access admin endpoint without token
curl http://localhost:5000/api/reviews/all
```
✅ Expected: 401 Unauthorized error

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Responsive Design

Test at different screen sizes:
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

## Performance Checks

- [ ] Homepage loads in < 3 seconds
- [ ] Products page loads in < 3 seconds
- [ ] No console errors on any page
- [ ] Images load properly
- [ ] Navigation is smooth

## Security Checks

- [ ] Cannot access admin endpoints without token
- [ ] Cannot access admin dashboard without login
- [ ] Password is not visible in network requests
- [ ] JWT token is stored securely
- [ ] Admin actions require authentication

## Final Verification

### All Systems Green ✅
- [ ] Backend server running
- [ ] Frontend dev server running
- [ ] MongoDB connected
- [ ] All pages accessible
- [ ] Admin panel functional
- [ ] No critical errors in console

---

## If Tests Fail

1. Check server logs for errors
2. Check browser console for errors
3. Verify MongoDB is running
4. Verify all dependencies installed
5. Check environment variables are set
6. Restart both servers
7. Clear browser cache and localStorage

## Reporting Issues

If you encounter issues:
1. Note which test failed
2. Check error messages in:
   - Terminal (backend)
   - Terminal (frontend)
   - Browser console
3. Verify prerequisites are met
4. Consult SETUP.md for troubleshooting

---

**All tests passed?** 🎉 Your Hardware Boutique is ready to use!
