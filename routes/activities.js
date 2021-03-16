'use strict';

const express = require('express'),
    router = express.Router(),
    slugify = require('slugify');

router.get('/', (req, res) => {
    res.json('Activities JSON Object Here').status(200);
});

module.exports = router;