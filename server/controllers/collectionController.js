const Collection = require("../models/collection");

class CollectionController {
  async createCollection(req, res) {
    try {
      const {
        name,
        description,
        theme,
        image,
        itemName,
        tags,
        itemFieldName1,
        itemFieldName2,
        itemFieldName3,
        itemFieldType1,
        itemFieldType2,
        itemFieldType3,
        userId,
      } = req.body;

      const tagsArray = JSON.parse(tags);

      const newCollection = new Collection({
        name,
        description,
        theme,
        image,
        itemName,
        tags: tagsArray,
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
        return res.status(404).json({ message: "Коллекция не найдена" });
      }

      await collection.deleteOne();

      return res.status(200).json({ message: "Коллекция успешно удалена" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new CollectionController();
