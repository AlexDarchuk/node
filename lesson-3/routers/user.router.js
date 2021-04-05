const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsIdValid, userController.getOneUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
