module.exports = {
    PORT: 5006,
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    MONGO_URL: process.env.MONG0_URL || 'mongodb://localhost/sep-2021'
};
