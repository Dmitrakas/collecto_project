const express = require('express');
const router = express.Router();
const itemFieldController = require('../controllers/itemFieldController');

router.get('/', itemFieldController.getAllItemFields);
router.post('/', itemFieldController.createItemField);
router.get('/:itemFieldId', itemFieldController.getItemFieldById);
router.put('/:itemFieldId', itemFieldController.updateItemField);
router.delete('/:itemFieldId', itemFieldController.deleteItemField);

module.exports = router;
