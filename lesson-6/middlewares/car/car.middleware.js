const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');

const { carService } = require('../../services');

const { carValidator } = require('../../validators');

module.exports = {
    isCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;
            const { preferL = 'en' } = req.body;

            if (carId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarRegistered: async (req, res, next) => {
        try {
            const { carId, preferL = 'en' } = req.params;

            const car = await carService.findCarById(carId);

            if (!car) {
                throw new Error(errorMessage.NOT_EXISTING_ID[preferL]);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
