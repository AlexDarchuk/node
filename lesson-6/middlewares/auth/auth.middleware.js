const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../../configs/config');

const { O_Auth } = require('../../dataBase');
const { TOKEN_IS_REQUIRED, NOT_VALID_ID, TOKEN_NOT_VALID } = require('../../errors/error.messages');

const { constants } = require('../../constants');
const errorCodes = require('../../constants/errorCodes.enum');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const { preferL = 'en' } = req.body;

            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new Error(TOKEN_IS_REQUIRED[preferL]);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(NOT_VALID_ID[preferL]);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(TOKEN_IS_REQUIRED[preferL]);
            }

            req.user = tokens._user_id;
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { preferL = 'en' } = req.body;

            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(TOKEN_IS_REQUIRED[preferL]);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new Error(TOKEN_NOT_VALID[preferL]);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new Error(TOKEN_NOT_VALID[preferL]);
            }

            req.oldTokens = tokens;

            next();
        } catch (e) {
            res.status(errorCodes.FORBIDDEN).json(e.message);
        }
    }
};
