const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');

const { carService } = require('../../services');

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
            const {
                model, price, preferL = 'en'
            } = req.body;

            if (!model || !price) {
                throw new Error(errorMessage.SOME_FILED_IS_EMPTY[preferL]);
            }

            if (typeof price !== 'number') {
                throw new Error(errorMessage.THE_DATA_ENTERED_IS_NOT_GOOD[preferL]);
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
