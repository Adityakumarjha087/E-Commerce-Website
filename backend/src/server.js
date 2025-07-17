require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// PayPal configuration
const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const environment = process.env.NODE_ENV === 'production' 
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment);
};

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Create PayPal order
app.post('/api/payment/orders', async (req, res) => {
  console.log('Received payment order request:', req.body);
  
  try {
    const { amount } = req.body;
    
    if (!amount) {
      console.error('Amount is required');
      return res.status(400).json({ error: 'Amount is required' });
    }

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: amount.toString()
              }
            }
          },
          items: [
            {
              name: "E-commerce Purchase",
              description: "Payment for items in cart",
              quantity: "1",
              unit_amount: {
                currency_code: "USD",
                value: amount.toString()
              }
            }
          ]
        }
      ]
    });

    const client = configureEnvironment();
    const order = await client.execute(request);
    
    console.log('PayPal order created:', order.result.id);
    
    res.json({
      id: order.result.id,
      status: order.result.status,
      links: order.result.links
    });
  } catch (error) {
    console.error('Error creating PayPal order:', {
      message: error.message,
      status: error.statusCode,
      details: error.details,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Failed to create PayPal order',
      details: error.message 
    });
  }
});

// Capture PayPal payment
app.post('/api/payment/capture/:orderID', async (req, res) => {
  const { orderID } = req.params;
  
  try {
    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const client = configureEnvironment();
    const capture = await client.execute(request);
    
    console.log('Payment captured:', capture.result.id);
    
    res.json({
      success: true,
      orderID: capture.result.id,
      status: capture.result.status,
      payer: capture.result.payer,
      purchase_units: capture.result.purchase_units
    });
  } catch (error) {
    console.error('Error capturing payment:', error);
    res.status(500).json({ 
      error: 'Failed to capture payment',
      details: error.message 
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
