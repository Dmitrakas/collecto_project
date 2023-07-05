const Collection = require('../models/collection');


class CollectionController {
    async createCollection(req, res) {
        try {
            const { name, description, theme, image } = req.body;
            const newCollection = new Collection({
              name,
              description,
              theme,
              image,
              userId: req.user.id
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
            const collections = await Collection.find({userId: req.user.id})
            return res.json({collections})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get collections"})
        }
    }
}

module.exports = new CollectionController();