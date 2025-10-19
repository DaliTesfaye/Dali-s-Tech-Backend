const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Admin
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ email });
        if (!adminExists) 
            return res.status(400).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, adminExists.password);
        if (!isMatch) 
            return res.status(400).json({ message: 'Invalid email or password' });

        // ✅ Create JWT with role
        const token = jwt.sign(
            { id: adminExists._id, role: "admin" },
            process.env.SECRET_KEY, 
            { expiresIn: '7d' }
        );

        res.json({ token });
        
        //Token Got here
        console.log("Received token:", token);

    } catch (err) {
        console.error('[Admin Login Error]:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};