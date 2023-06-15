const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.get('/', collectionController.getAllCollections);
router.post('/', collectionController.createCollection);
router.get('/:id', collectionController.getCollectionById);
router.put('/:id', collectionController.updateCollection);
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;
