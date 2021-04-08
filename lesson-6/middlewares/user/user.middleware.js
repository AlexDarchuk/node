const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');

const { userService } = require('../../services');

const { userValidator } = require('../../validators');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.body;

            if (userId < 0) {
                throw new Error(errorMessage.NOT_VALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserRegistered: async (req, res, next) => {
        try {
            const { email, preferL = 'en' } = req.params;

            const user = await userService.findUserByEmail({ email });

            if (!user) {
                throw new Error(errorMessage.NOT_EXISTING_ID[preferL]);
            }

            req.user = user;

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
