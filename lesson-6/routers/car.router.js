const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.isCarIdValid, carMiddleware.isCarRegistered, carController.getOneCar);

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.delete('/:carId', carMiddleware.isCarIdValid, carMiddleware.isCarRegistered, carController.deleteCar);

module.exports = router;
