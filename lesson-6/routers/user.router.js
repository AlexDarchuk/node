const router = require('express').Router();

const { userController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsIdValid, authMiddleware.checkAccessTokenMiddleware, userController.getOneUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.delete('/:userId', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;
