const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const collectionController = require('../controllers/collectionController');

router.post('/create', authMiddleware, collectionController.createCollection);
router.delete('/delete/:id', authMiddleware, collectionController.deleteCollection);
router.put('/update/:id', authMiddleware, collectionController.updateCollection);

router.get('/collections', collectionController.getCollections);
router.get('/allCollections', collectionController.getAllCollections);
router.get('/collectionById', collectionController.getCollectionById);
router.get('/largest', collectionController.getLargestCollections);


module.exports = router;
