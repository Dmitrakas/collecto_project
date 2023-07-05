const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const collectionController = require('../controllers/collectionController');

router.post('', authMiddleware, collectionController.createCollection);
router.get('', authMiddleware, collectionController.getCollections);

module.exports = router;
