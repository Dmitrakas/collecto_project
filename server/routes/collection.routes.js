const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const collectionController = require('../controllers/collectionController');

router.post('/create', collectionController.createCollection);
router.get('/collections',  collectionController.getCollections);
router.get('/allCollections',  collectionController.getAllCollections);
router.get('/collectionById',  collectionController.getCollectionById);
router.delete('/delete/:id',  collectionController.deleteCollection);
router.put('/update/:id',  collectionController.updateCollection);
router.get('/largest', collectionController.getLargestCollections);


module.exports = router;
