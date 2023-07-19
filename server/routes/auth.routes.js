const Router = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', [
  check('email', 'Incorrect email address. ').isEmail(),
  check('password', 'Password must be longer than 3 and shorter than 12.').isLength({ min: 3, max: 12 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const { username, email, password } = req.body;
    const candidate = await User.findOne({ email: email });

    if (candidate) {
      return res.status(400).json({ error: `User with email ${email} already exists` });
    }

    const hashPassword = await bcrypt.hash(password, 2);
    const user = new User({ username, email, password: hashPassword });

    try {
      await user.save();
      return res.json({ message: 'User was successfully created' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error saving user to the database' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found. Please check your email or register if you haven't already." });
    }
    if (user.blocked === true) {
      return res.status(403).json({ error: "User is blocked. Please contact our support team for more information." });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password. Please enter the correct password." });
    }
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.get('secretKey'), { expiresIn: "1h" });
    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        blocked: user.blocked
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});


router.get('/auth', authMiddleware,
  async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      if (user.blocked === true) {
        return res.status(403).json({ error: "User is blocked. Please contact our support team for more information." });
      }

      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.get("secretKey"), { expiresIn: "6h" });

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          blocked: user.blocked
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = router;