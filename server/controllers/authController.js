const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    user.token = token;
    await user.save();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to logout' });
  }
};


exports.checkAuthStatus = async (req, res) => {
  try {
    const user = req.user;
    if (user.token === undefined) {
      return res.json({ message: 'User is not logged in' });
    }
    res.json({ message: 'User is authenticated' });
  } catch (error) {
    res.status(500).json({ error: 'Error checking authentication status' });
  }
};
