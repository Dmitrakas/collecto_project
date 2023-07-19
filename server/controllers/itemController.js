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

      if (req.user.id !== userId && req.user.isAdmin !== true) {
        return res.status(401).json({ error: "User is not Authorized!" });
      }

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
      res.status(500).json({ error: 'Failed to create item' });
    }
  };

  async deleteItem(req, res) {
    try {
      const itemId = req.params.id;
      const userId = req.params.userId;

      if (req.user._id != userId && req.user.isAdmin != true) {
        return res.status(401).json({ error: "User is not Authorized!" });
      }

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      await Comment.deleteMany({ itemId: item._id });
      await item.deleteOne();

      return res.status(200).json({ error: "Item and associated comments deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }


  async updateItem(req, res) {
    try {
      const itemId = req.params.id;
      const userId = req.params.userId;
      const updatedData = req.body;

      if (req.user._id !== userId && req.user.isAdmin !== true) {
        return res.status(401).json({ error: "User is not Authorized!" });
      }

      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      item.set(updatedData);
      await item.save();

      return res.status(200).json({ error: "Item updated successfully", item });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getItemsByCollectionId(req, res) {
    try {
      const items = await Item.find({ collectionId: req.query.collectionId });
      return res.json({ items })
    } catch (error) {
      console.error('Error fetching items by collection ID:', error);
      res.status(500).json({ error: 'Failed to fetch items by collection ID' });
    }
  };



  async getRecentItems(req, res) {
    try {
      const items = await Item.find().sort({ _id: -1 }).limit(10);
      return res.json({ items });
    } catch (error) {
      console.error('Error fetching recent items:', error);
      res.status(500).json({ error: 'Failed to fetch recent items' });
    }
  };

  async getItemById(req, res) {
    try {
      const item = await Item.findById(req.query.id);
      return res.json({ item });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Can not get item" });
    }
  }

  async getTopTags(req, res) {
    try {
      const items = await Item.find({});
      const tags = items.reduce((acc, item) => {
        item.tags.forEach(tag => {
          if (!acc[tag]) {
            acc[tag] = 1;
          } else {
            acc[tag]++;
          }
        });
        return acc;
      }, {});

      const topTags = Object.entries(tags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50)
        .map(([tag]) => tag);

      res.json({ tags: topTags });
    } catch (error) {
      console.error('Error fetching top tags:', error);
      res.status(500).json({ error: 'Failed to fetch top tags' });
    }
  }

}

module.exports = new ItemController();