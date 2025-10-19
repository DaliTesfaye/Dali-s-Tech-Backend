const Order = require('../models/Order');
const Product = require('../models/Product');


//Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { products  } = req.body;

        let total = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            total += product.price * item.quantity;
        }
        const order = new Order({
            userId : req.user._id,
            products,
            total,
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
        res.status(400).json({ message: "Error Creating Order", error: err.message });
    }
};

//Delete Order by User
exports.deleteUserOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!order) {
            return res.status(404).json({ message: 'Order Not Found or Unauthorized' });
        }
        res.json({ message: 'Order Deleted Successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Deleting Order', error: error.message });
    }
}

//Get All Orders (Admin Only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'username email');
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Fetching Orders', error: error.message });
    }
}

//Get User Orders
exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query; // for now from query
        const orders = await Order.find({ userId }).populate('products.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching User Orders", error: error.message });
    }
}

//Update Order Status (Admin Only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order Not Found' });
        }
        res.json({ message: 'Order Status Updated', order });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Updating Order Status', error: error.message });
    }
}

//Delete an Order (Admin Only)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order Not Found' });
        }
        res.json({ message: 'Order Deleted Successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error Deleting Order', error: error.message });
    }
}

