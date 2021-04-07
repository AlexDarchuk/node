const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./routers/api.router');
const { PORT } = require('./configs/config');

const app = express();

_connectDB();

app.use(express.json()); // для роботи з json і не тільки
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _connectDB() {
    mongoose.connect('mongodb://localhost/sep-2021', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}

// npm i express-handlebars
