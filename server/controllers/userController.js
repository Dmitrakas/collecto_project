const User = require('../models/user');
const Collection = require('../models/collection');
const Item = require('../models/item');
const Comment = require('../models/comment');
const cloudinary = require('../utils/cloudinary');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUsernameById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ username: user.username });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch username' });
    }
  }

  async blockUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.blocked = true;
      await user.save();
      res.json({ message: 'User blocked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to block user' });
    }
  }

  async unblockUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.blocked = false;
      await user.save();
      res.json({ message: 'User unblocked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to unblock user' });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const collections = await Collection.find({ userId: user._id });
      for (const collection of collections) {
        if (collection.imageId) {
          const imgId = collection.imageId;
          await cloudinary.uploader.destroy(imgId);
        }
      }

      await Collection.deleteMany({ userId: user._id });
      await Item.deleteMany({ userId: user._id });
      await Comment.deleteMany({ author: user._id });
      await user.deleteOne();

      res.json({ message: 'User, associated collections, items, and comments deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }


  async grantAdminAccess(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.isAdmin = true;
      await user.save();
      res.json({ message: 'Admin access granted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to grant admin access' });
    }
  }

  async revokeAdminAccess(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.isAdmin = false;
      await user.save();
      res.json({ message: 'Admin access revoked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to revoke admin access' });
    }
  }
}

module.exports = new UserController();
