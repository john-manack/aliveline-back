'use strict';

const host = "queenie.db.elephantsql.com",
    database = "dpxbnzyy",
    user = "dpxbnzyy",
    password = "mm5VXYwUHexBOZvMI4bFW4OBjzNQveY8";

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('a query was run')
    }
});

const options = {
    host, 
    database,
    user,
    password
}

const db = pgp(options);

module.exports = db;