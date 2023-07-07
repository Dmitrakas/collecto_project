const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

router.post('/create', itemController.createItem);
router.get('/collections',  itemController.getItemsByCollectionId);

module.exports = router;
