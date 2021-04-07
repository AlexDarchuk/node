const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');

const { carService } = require('../../services');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findCars();

            res.status(errorCodes.OK).json(cars);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const cars = await carService.findCarById(carId);

            res.status(errorCodes.OK).json(cars);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(errorCodes.OK).json(errorMessage.CARS_IS_CCREATED);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(errorCodes.OK).json(errorMessage.CARS_IS_DELETE);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
