'use strict';
const host = 'localhost',
    database = 'aliveline';

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY (for dev):', event.query);
    }
});

const options = {
    host,
    database
}

const db = pgp(options);

module.exports = db;