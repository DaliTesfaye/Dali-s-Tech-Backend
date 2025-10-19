const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/allProducts', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/create' , authMiddleware , adminMiddleware , productController.createProduct);
router.put('/:id', authMiddleware , adminMiddleware , productController.updateProduct);
router.delete('/:id', authMiddleware , adminMiddleware , productController.deleteProduct);



module.exports = router;