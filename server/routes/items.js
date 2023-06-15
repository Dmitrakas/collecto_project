const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.post('/', itemController.createItem);
router.get('/:itemId', itemController.getItemById);
router.put('/:itemId', itemController.updateItem);
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;
