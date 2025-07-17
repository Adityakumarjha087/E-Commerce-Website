# E-commerce Backend with Razorpay Integration

This is the backend server for the e-commerce store, handling payment processing with Razorpay.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
     ```
     PORT=5000
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     NODE_ENV=development
     ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

## Available Endpoints

- `POST /api/payment/orders` - Create a new Razorpay order
- `POST /api/payment/verify` - Verify a payment
- `GET /api/test` - Test endpoint to check if the server is running

## Frontend Integration

The frontend should be configured to make requests to the backend API. Update the `VITE_APP_API_URL` in the frontend's `.env` file to point to your backend server.

## Production Deployment

For production, make sure to:
1. Set `NODE_ENV=production`
2. Configure HTTPS
3. Use environment variables for sensitive data
4. Set up proper CORS configuration
5. Implement rate limiting and security headers
