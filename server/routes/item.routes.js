const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

router.post('/create', itemController.createItem);
router.get('/itemsByCollectionId', itemController.getItemsByCollectionId);
router.get('/recent', itemController.getRecentItems);
router.get('/itemById', itemController.getItemById);
router.delete('/delete/:id', itemController.deleteItem);
router.put('/update/:id', itemController.updateItem);
router.get('/topTags', itemController.getTopTags);

module.exports = router;
