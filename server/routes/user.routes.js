const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.put('/:userId/block', userController.blockUser);
router.put('/:userId/unblock', userController.unblockUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/admin/grant', userController.grantAdminAccess);
router.put('/:userId/admin/revoke', userController.revokeAdminAccess);
router.get('/username/:userId', userController.getUsernameById);

module.exports = router;
