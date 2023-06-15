const ItemTag = require('../models/itemTag');

const getAllItemTags = async (req, res) => {
  try {
    const itemTags = await ItemTag.find();
    res.json(itemTags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get item tags' });
  }
};

const createItemTag = async (req, res) => {
  try {
    const itemTag = await ItemTag.create(req.body);
    res.status(201).json(itemTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item tag' });
  }
};

const getItemTagById = async (req, res) => {
  try {
    const itemTag = await ItemTag.findById(req.params.itemTagId);
    if (!itemTag) {
      return res.status(404).json({ error: 'Item tag not found' });
    }
    res.json(itemTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get item tag' });
  }
};

const updateItemTag = async (req, res) => {
  try {
    const itemTag = await ItemTag.findByIdAndUpdate(req.params.itemTagId, req.body, { new: true });
    if (!itemTag) {
      return res.status(404).json({ error: 'Item tag not found' });
    }
    res.json(itemTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item tag' });
  }
};

const deleteItemTag = async (req, res) => {
  try {
    const itemTag = await ItemTag.findByIdAndDelete(req.params.itemTagId);
    if (!itemTag) {
      return res.status(404).json({ error: 'Item tag not found' });
    }
    res.json({ message: 'Item tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item tag' });
  }
};

module.exports = {
  getAllItemTags,
  createItemTag,
  getItemTagById,
  updateItemTag,
  deleteItemTag,
};
