const Collection = require('../models/collection');


class CollectionController {
  async createCollection(req, res) {
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
      return res.json(newCollection);
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }
  }

  async getCollections(req, res) {
    try {
      const collections = await Collection.find({ userId: req.query.userId })
      return res.json({ collections })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: "Can not get collections" })
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


}

module.exports = new CollectionController();