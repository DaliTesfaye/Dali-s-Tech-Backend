const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User 
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        let userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        })
        await newUser.save()
        res.status(201).json({ message: "Registarated Successfully" });
    }
    catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

//Login User

exports.login = async (req, res) => {
    const {email , password} = req.body ;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message : 'Invalid Email or password'});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) 
            return res.status(400).json({message : 'Invalid Email or password'});

        const token = jwt.sign(
            { _id: user._id , role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        );
        res.json({ token });
    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}