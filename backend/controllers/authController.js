const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/jwt');
const register = async (req, res) => {
    const { email, password , confirmPassword} = req.body;
    // Registration logic here
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Email, password, and confirm password are required' });
    }   
    if (password!== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);

    return res.status(200).json({ message : "Login successful", token });
};

const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }  
    
    return res.status(200).json({ user });
};

const logout = (req, res) => {
    return res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  login,
  register,
  getProfile,
  logout
};
