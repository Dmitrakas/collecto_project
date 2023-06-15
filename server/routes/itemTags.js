const express = require('express');
const router = express.Router();
const itemTagController = require('../controllers/itemTagController');

router.get('/', itemTagController.getAllItemTags);
router.post('/', itemTagController.createItemTag);
router.get('/:itemTagId', itemTagController.getItemTagById);
router.put('/:itemTagId', itemTagController.updateItemTag);
router.delete('/:itemTagId', itemTagController.deleteItemTag);

module.exports = router;
