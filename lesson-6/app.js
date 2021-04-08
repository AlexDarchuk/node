const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const apiRouter = require('./routers/api.router');
const { PORT, MONGO_URL } = require('./configs/config');

const app = express();

_connectDB();

app.use(express.json()); // для роботи з json і не тільки
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${PORT}`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
}

// npm i express-handlebars
