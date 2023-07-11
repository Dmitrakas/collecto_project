const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/',  userController.getAllUsers);

module.exports = router;
