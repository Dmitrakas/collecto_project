const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.get('/', tagController.getAllTags);
router.post('/', tagController.createTag);
router.get('/:tagId', tagController.getTagById);
router.put('/:tagId', tagController.updateTag);
router.delete('/:tagId', tagController.deleteTag);

module.exports = router;
