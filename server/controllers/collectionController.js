const Collection = require("../models/collection");
const Item = require('../models/item');

class CollectionController {
  async createCollection(req, res) {
    try {
      const {
        name,
        description,
        theme,
        image,
        itemFieldName1,
        itemFieldName2,
        itemFieldName3,
        itemFieldType1,
        itemFieldType2,
        itemFieldType3,
        userId,
      } = req.body;

      const newCollection = new Collection({
        name,
        description,
        theme,
        image,
        itemFieldName1,
        itemFieldName2,
        itemFieldName3,
        itemFieldType1,
        itemFieldType2,
        itemFieldType3,
        userId,
      });

      await newCollection.save();
      return res.json(newCollection);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getCollections(req, res) {
    try {
      const collections = await Collection.find({ userId: req.query.userId });
      return res.json({ collections });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get collections" });
    }
  }

  async getAllCollections(req, res) {
    try {
      const collections = await Collection.find();
      return res.json({ collections });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get collections" });
    }
  }

  async getCollectionById(req, res) {
    try {
      const collection = await Collection.findById(req.query.id);
      return res.json({ collection });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get collection" });
    }
  }

  async deleteCollection(req, res) {
    try {
      const collectionId = req.params.id;

      const collection = await Collection.findById(collectionId);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      await collection.deleteOne();

      return res.status(200).json({ message: "Collection was successfully deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateCollection(req, res) {
    try {
      const collectionId = req.params.id;
      const updatedData = req.body;

      const collection = await Collection.findById(collectionId);
      if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      collection.set(updatedData);
      await collection.save();

      return res.status(200).json({ message: "Collection updated successfully", collection });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getLargestCollections(req, res) {
    try {
      const largestCollections = await Collection.aggregate([
        { $lookup: { from: 'items', localField: '_id', foreignField: 'collectionId', as: 'items' } },
        {
          $project: {
            name: 1,
            description: 1,
            theme: 1,
            image: 1,
            itemCount: { $size: '$items' }
          }
        },
        { $sort: { itemCount: -1 } },
        { $limit: 5 }
      ]);
      res.json({ largestCollections });
    } catch (error) {
      console.error('Failed to get largest collections:', error);
      res.status(500).json({ message: 'Failed to get largest collections' });
    }
  }

}

module.exports = new CollectionController();
