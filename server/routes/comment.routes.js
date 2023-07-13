const Router = require('express');
const Comment = require('../models/comment');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  try {
    const { text, author, itemId } = req.body;

    const newComment = new Comment({
      text,
      author,
      itemId
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});


router.get('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    const comments = await Comment.find({ itemId });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

router.delete('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

router.put('/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

module.exports = router;