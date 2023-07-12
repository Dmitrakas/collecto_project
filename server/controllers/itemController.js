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

  async deleteItem(req, res) {
    try {
      const itemId = req.params.id;

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      await item.deleteOne();

      return res.status(200).json({ message: "Item was successfully deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateItem(req, res) {
    try {
      const itemId = req.params.id;
      const updatedData = req.body;

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      item.set(updatedData);
      await item.save();

      return res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

}

module.exports = new ItemController();