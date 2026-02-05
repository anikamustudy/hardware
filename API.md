# Hardware Boutique API Documentation

Base URL: `http://localhost:5000/api` (development)

All requests and responses use JSON format.

## Authentication

Most endpoints require no authentication. Admin-only endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Health Check

#### GET /api/health

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Hardware Boutique API is running"
}
```

---

## Authentication Endpoints

### Register User

#### POST /api/auth/register

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

#### POST /api/auth/login

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "admin@hardwareboutique.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "email": "admin@hardwareboutique.com",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Current User

#### GET /api/auth/me

Get the currently authenticated user's information.

**Headers:** Requires authentication

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "email": "admin@hardwareboutique.com",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Product Endpoints

### Get All Products

#### GET /api/products

Get a list of all products.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Claw Hammer",
    "description": "Professional grade 16oz claw hammer",
    "price": 24.99,
    "category": "Tools",
    "image": "https://example.com/hammer.jpg",
    "inStock": true,
    "quantity": 50,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Product by ID

#### GET /api/products/:id

Get a specific product by its ID.

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Claw Hammer",
  "description": "Professional grade 16oz claw hammer",
  "price": 24.99,
  "category": "Tools",
  "image": "https://example.com/hammer.jpg",
  "inStock": true,
  "quantity": 50,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Get Products by Category

#### GET /api/products/category/:category

Get all products in a specific category.

**Response:** Same as Get All Products

### Create Product (Admin Only)

#### POST /api/products

Create a new product.

**Headers:** Requires admin authentication

**Request Body:**
```json
{
  "name": "Claw Hammer",
  "description": "Professional grade 16oz claw hammer",
  "price": 24.99,
  "category": "Tools",
  "image": "https://example.com/hammer.jpg",
  "inStock": true,
  "quantity": 50
}
```

**Response:** Returns the created product

### Update Product (Admin Only)

#### PUT /api/products/:id

Update an existing product.

**Headers:** Requires admin authentication

**Request Body:** Same as Create Product

**Response:** Returns the updated product

### Delete Product (Admin Only)

#### DELETE /api/products/:id

Delete a product.

**Headers:** Requires admin authentication

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Review Endpoints

### Get Approved Reviews

#### GET /api/reviews

Get all approved customer reviews.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "customerName": "John Smith",
    "rating": 5,
    "comment": "Excellent service!",
    "date": "2024-01-01T00:00:00.000Z",
    "approved": true
  }
]
```

### Create Review

#### POST /api/reviews

Submit a new review.

**Request Body:**
```json
{
  "customerName": "John Smith",
  "rating": 5,
  "comment": "Excellent service and quality products!"
}
```

**Response:** Returns the created review (not yet approved)

### Get All Reviews (Admin Only)

#### GET /api/reviews/all

Get all reviews including pending ones.

**Headers:** Requires admin authentication

**Response:** Same format as Get Approved Reviews

### Approve Review (Admin Only)

#### PUT /api/reviews/:id/approve

Approve a pending review.

**Headers:** Requires admin authentication

**Response:** Returns the approved review

### Delete Review (Admin Only)

#### DELETE /api/reviews/:id

Delete a review.

**Headers:** Requires admin authentication

**Response:**
```json
{
  "message": "Review deleted successfully"
}
```

---

## Business Info Endpoints

### Get Business Information

#### GET /api/business

Get the business information including address, hours, contact details.

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Hardware Boutique",
  "description": "Your one-stop shop for all hardware needs",
  "address": {
    "street": "123 Main Street",
    "city": "Springfield",
    "state": "IL",
    "zip": "62701",
    "country": "USA"
  },
  "coordinates": {
    "lat": 39.7817,
    "lng": -89.6501
  },
  "phone": "(555) 123-4567",
  "email": "info@hardwareboutique.com",
  "hours": {
    "monday": "8:00 AM - 6:00 PM",
    "tuesday": "8:00 AM - 6:00 PM",
    "wednesday": "8:00 AM - 6:00 PM",
    "thursday": "8:00 AM - 6:00 PM",
    "friday": "8:00 AM - 6:00 PM",
    "saturday": "9:00 AM - 5:00 PM",
    "sunday": "Closed"
  },
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Update Business Information (Admin Only)

#### PUT /api/business

Update business information.

**Headers:** Requires admin authentication

**Request Body:** Same structure as the response from GET /api/business

**Response:** Returns the updated business information

---

## Contact Endpoints

### Send Contact Message

#### POST /api/contact

Send a message through the contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a question about your products..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

### 400 Bad Request
```json
{
  "message": "Error message describing what went wrong"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Detailed error message"
}
```

---

## Using the API

### Example: Login and Create a Product

```bash
# 1. Login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hardwareboutique.com",
    "password": "admin123"
  }'

# Response will include a token, use it in the next request

# 2. Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Hammer",
    "description": "Great hammer",
    "price": 29.99,
    "category": "Tools",
    "image": "https://example.com/hammer.jpg",
    "inStock": true,
    "quantity": 100
  }'
```

### Example: Get Products and Reviews

```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl http://localhost:5000/api/products/category/Tools

# Get approved reviews
curl http://localhost:5000/api/reviews

# Get business info
curl http://localhost:5000/api/business
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider implementing rate limiting to prevent abuse.

## CORS

CORS is enabled for all origins in development. In production, configure CORS to only allow your frontend domain.

## Security Notes

1. Always use HTTPS in production
2. Keep JWT_SECRET secure and never commit it to version control
3. Implement rate limiting in production
4. Validate and sanitize all user inputs
5. Use strong passwords for admin accounts
6. Regularly update dependencies for security patches
