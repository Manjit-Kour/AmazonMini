const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, emailId, password, address, isSeller } = req.body;
    try {
        // Validate input 
        if (!name || !emailId || !password) {
            return res.status(400).json({ error: 'Required fields missing' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Save user
        const newUser = await User.create({
            name,
            emailId,
            password: hashedPassword,
            address,
            isSeller
        });

        // Remove password before sending response
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "User can't be registered" });
    }
};


const loginUser = async (req, res) => {
    const { emailId, password } = req.body;

    try {
        // Check input
        if (!emailId || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET || "defaultSecret", 
            { expiresIn: '1h' }
        );

        // Respond (without password)
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login' });
    }
};

module.exports={
    registerUser,
    loginUser
}