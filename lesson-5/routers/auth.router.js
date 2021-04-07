const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.isUserRegistered, authController.authCheck);

module.exports = router;
