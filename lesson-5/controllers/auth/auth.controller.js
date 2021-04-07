const errorCodes = require('../../constants/errorCodes.enum');
const errorMessage = require('../../errors/error.messages');

const { User } = require('../../dataBase');
const { passwordHasher } = require('../../helpers');

module.exports = {
    authCheck: async (req, res) => {
        try {
            const { email, password, preferL = 'en' } = req.body;

            const user = await User.findOne({ email });

            await passwordHasher.compare(password, user.password);

            res.json(errorMessage.AUTH_SUCCESSFUL[preferL]);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
