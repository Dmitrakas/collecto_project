const ItemField = require('../models/itemField');

const getAllItemFields = async (req, res) => {
  try {
    const itemFields = await ItemField.find();
    res.json(itemFields);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get item fields' });
  }
};

const createItemField = async (req, res) => {
  try {
    const itemField = await ItemField.create(req.body);
    res.status(201).json(itemField);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item field' });
  }
};

const getItemFieldById = async (req, res) => {
  try {
    const itemField = await ItemField.findById(req.params.itemFieldId);
    if (!itemField) {
      return res.status(404).json({ error: 'Item field not found' });
    }
    res.json(itemField);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get item field' });
  }
};

const updateItemField = async (req, res) => {
  try {
    const itemField = await ItemField.findByIdAndUpdate(req.params.itemFieldId, req.body, { new: true });
    if (!itemField) {
      return res.status(404).json({ error: 'Item field not found' });
    }
    res.json(itemField);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item field' });
  }
};

const deleteItemField = async (req, res) => {
  try {
    const itemField = await ItemField.findByIdAndDelete(req.params.itemFieldId);
    if (!itemField) {
      return res.status(404).json({ error: 'Item field not found' });
    }
    res.json({ message: 'Item field deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item field' });
  }
};

module.exports = {
  getAllItemFields,
  createItemField,
  getItemFieldById,
  updateItemField,
  deleteItemField,
};
