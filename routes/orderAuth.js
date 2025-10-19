const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

//User Management of Orders
// Create a new order by user
router.post('/create', authMiddleware , orderController.createOrder);
//Delete order by user 
router.delete('/my-orders/:id',authMiddleware ,  orderController.deleteUserOrder);
// Get orders for the logged-in user
router.get('/my-orders', authMiddleware , orderController.getUserOrders);

//Admin Management of Orders
// Get all orders (Admin only)
router.get('/allorders' , authMiddleware , adminMiddleware , orderController.getAllOrders);
// Update order status (Admin only)
router.put('/:id', orderController.updateOrderStatus);
//Delete an order (Admin only)
router.delete('/:id', orderController.deleteOrder);


module.exports = router;
