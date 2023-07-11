const Item = require('../models/item');


class ItemController {
  async createItem(req, res) {
    try {
      const {
        name,
        tags,
        fieldValue1,
        fieldValue2,
        fieldValue3,
        collectionId,
        userId
      } = req.body;

      const newItem = new Item({
        name,
        tags,
        fieldValue1,
        fieldValue2,
        fieldValue3,
        collectionId,
        userId
      });

      const createdItem = await newItem.save();
      res.status(201).json(createdItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ message: 'Failed to create item' });
    }
  };



  async getItemsByCollectionId(req, res) {
    try {
      const items = await Item.find({ collectionId: req.query.collectionId });
      return res.json({ items })
    } catch (error) {
      console.error('Error fetching items by collection ID:', error);
      res.status(500).json({ message: 'Failed to fetch items by collection ID' });
    }
  };

}

module.exports = new ItemController();