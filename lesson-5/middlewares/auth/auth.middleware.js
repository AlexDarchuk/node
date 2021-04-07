const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');
const { User } = require('../../dataBase');

module.exports = {
    isUserRegistered: async (req, res, next) => {
        try {
            const { email, preferL = 'en' } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.WRONG_EMAIL_OR_PASSWORD[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
