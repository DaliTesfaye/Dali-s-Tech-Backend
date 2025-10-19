const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3000;


// Database connection
const connectDB = require('./config/db');
connectDB();

//JSON Middleware
app.use(express.json());
app.use(cors());

// Import Routes

// User Auth Routes
const userAuthRoutes = require('./routes/userAuth')
app.use('/api/auth/user' , userAuthRoutes)

// Admin Auth Routes
const adminAuthRoutes = require('./routes/adminAuth')
app.use('/api/auth/admin' , adminAuthRoutes)

// Product Auth Routes
const productRoutes = require('./routes/product')
app.use('/api/products' , productRoutes)

// Order Auth Routes
const orderAuth = require('./routes/orderAuth');
app.use('/api/orders', orderAuth);


app.get('/', (req, res) => {
    res.send('Welcome to Dalix Tech Shop API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});