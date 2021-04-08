const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');

const { User } = require('../../dataBase');

const { authService } = require('../../services');

module.exports = {
    authCheck: async (req, res) => {
        try {
            const { email, password, preferL = 'en' } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(errorMessage.NO_USER[preferL]);
            }

            const tokens = await authService.createTokens(password, user);

            res.json(tokens);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    createToken: async (req, res) => {
        try {
            const { oldTokens } = req;

            const tokens = await authService.removeTokens(oldTokens);

            res.json(tokens);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
