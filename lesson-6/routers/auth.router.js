const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/', userMiddleware.isUserRegistered, authController.authCheck);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.createToken);

module.exports = router;
