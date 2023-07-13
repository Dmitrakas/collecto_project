const Item = require('../models/item');
const Comment = require('../models/comment');

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

      await Comment.deleteMany({ itemId: item._id });
      await item.deleteOne();

      return res.status(200).json({ message: "Item and associated comments deleted successfully" });
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

  async getRecentItems(req, res) {
    try {
      const items = await Item.find().sort({ _id: -1 }).limit(10);
      return res.json({ items });
    } catch (error) {
      console.error('Error fetching recent items:', error);
      res.status(500).json({ message: 'Failed to fetch recent items' });
    }
  };

  async getItemById(req, res) {
    try {
      const item = await Item.findById(req.query.id);
      return res.json({ item });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get item" });
    }
  }

}

module.exports = new ItemController();