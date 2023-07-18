const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

router.post('/create',authMiddleware, itemController.createItem);
router.delete('/delete/:id',authMiddleware, itemController.deleteItem);
router.put('/update/:id',authMiddleware, itemController.updateItem);
router.get('/itemsByCollectionId', itemController.getItemsByCollectionId);
router.get('/recent', itemController.getRecentItems);
router.get('/itemById', itemController.getItemById);
router.get('/topTags', itemController.getTopTags);

module.exports = router;
