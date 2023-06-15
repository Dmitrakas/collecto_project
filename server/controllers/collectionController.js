const Collection = require('../models/collection');
const cloudinary = require('../config/cloudinary.config');


const uploadImageToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }

    cloudinary.uploader.upload(file.path, { resource_type: 'auto' }, (error, result) => {
      if (error) {
        reject(error);
      }

      const imageUrl = result.secure_url;
      resolve(imageUrl);
    });
  });
};

const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get collections' });
  }
};

const createCollection = async (req, res) => {
  try {
    const { name, description, theme, userId } = req.body;
    const image = req.file;
    const imageUrl = await uploadImageToCloudinary(req.file);
    const newCollection = new Collection({ name, description, theme, image: imageUrl, userId });
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create collection' });
  }
};


const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get collection' });
  }
};

const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, theme, userId } = req.body;
    const updatedCollection = await Collection.findByIdAndUpdate(id, { name, description, theme, userId }, { new: true });
    if (!updatedCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update collection' });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCollection = await Collection.findByIdAndDelete(id);
    if (!deletedCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete collection' });
  }
};

module.exports = {
  getAllCollections,
  createCollection,
  getCollectionById,
  updateCollection,
  deleteCollection
};