const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

router.post('/', async (req, res) => {
  try {
    const { name, description, theme, image, userId } = req.body;

    const newCollection = new Collection({
      name,
      description,
      theme,
      image,
      userId,
    });

    await newCollection.save();

    res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create collection' });
  }
});

module.exports = router;
