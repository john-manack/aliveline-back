'use strict';
require("dotenv").config();

const HTTP = require('http');

const HOSTNAME = '0.0.0.0',
    PORT = process.env.PORT || 3030;

const express = require('express'),
    app = express();

const cors = require('cors');
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const SERVER = HTTP.createServer(app);

SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});

const rootController = require('./routes/index');
const activitiesController = require('./routes/activities');

app.use('/', rootController);
app.use('/activities', activitiesController);