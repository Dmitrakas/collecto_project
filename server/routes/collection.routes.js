const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const collectionController = require('../controllers/collectionController');

router.post('', collectionController.createCollection);
router.get('',  collectionController.getCollections);

module.exports = router;
