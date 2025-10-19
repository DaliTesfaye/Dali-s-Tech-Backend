const authMiddleware = require('../middlewares/authMiddleware');
const Product = require('../models/Product');

//Get All Products (public)
exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }  
    catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//get single product by id (public)
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Create a new product (admin only)
exports.createProduct  = async (req, res) => {
    const {name , description, price, category, fileUrl, thumbnailUrl} = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            fileUrl,
            thumbnailUrl
        })
        await newProduct.save();
        res.status(201).json({message: 'Product created successfully', product: newProduct});
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Update Product (admin only)
exports.updateProduct = async (req , res ) => {
    const { id } = req.params;
    const { name, description, price, category, fileUrl, thumbnailUrl } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, fileUrl, thumbnailUrl },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Delete Product (admin only)
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

