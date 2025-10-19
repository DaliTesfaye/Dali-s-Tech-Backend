const express = require('express');
const router = express.Router();
const userauthController = require('../controllers/userAuthController');

router.post('/register', userauthController.register);
router.post('/login', userauthController.login);

module.exports = router;
