const Router = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');
const router = new Router();

router.post('/registration',
  [
    check('email', "Uncorrect email address").isEmail(),
    check('password', "Password must be longer than 3 and shorter than 12").isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request', errors });
      }

      const { username, email, password } = req.body;
      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res.status(400).json({ message: `User with email ${email} already exists` });
      }
      const hashPassword = await bcrypt.hash(password, 2);
      const user = new User({ username, email, password: hashPassword });
      await user.save();
      return res.json({ message: 'User was successfully created' });
    }
    catch (err) {
      console.log(err);
      res.send({ message: "Server error" });
    }
  })

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"});
    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  }
  catch (err) {
    console.log(err);
    res.send({ message: "Server error" });
  }
})

module.exports = router;