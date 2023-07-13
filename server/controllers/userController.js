const User = require('../models/user');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
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
      console.error('Error fetching username:', error.message);
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
      console.error('Error blocking user:', error.message);
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
      console.error('Error unblocking user:', error.message);
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
      await user.deleteOne();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
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
      console.error('Error granting admin access:', error.message);
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
      console.error('Error revoking admin access:', error.message);
      res.status(500).json({ error: 'Failed to revoke admin access' });
    }
  }
}

module.exports = new UserController();
