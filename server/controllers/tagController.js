const Tag = require('../models/tag');

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tags' });
  }
};

const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = new Tag({ name });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tag' });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedTag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tag' });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
};

module.exports = {
  getAllTags,
  createTag,
  getTagById,
  updateTag,
  deleteTag
};
