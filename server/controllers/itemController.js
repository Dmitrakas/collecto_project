const Item = require('../models/item');


class ItemController {
  async createItem(req, res) {
    try {
      const {
        name,
        description,
        tags,
        fieldName1,
        fieldName2,
        fieldName3,
        fieldType1,
        fieldType2,
        fieldType3,
        collectionId,
        userId
      } = req.body;

      const newItem = new Item({
        name,
        description,
        tags,
        fieldName1,
        fieldName2,
        fieldName3,
        fieldType1,
        fieldType2,
        fieldType3,
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
      const { collectionId } = req.params;

      const items = await Item.find({ collectionId });

      res.json(items);
    } catch (error) {
      console.error('Error fetching items by collection ID:', error);
      res.status(500).json({ message: 'Failed to fetch items by collection ID' });
    }
  };

}

module.exports = new ItemController();