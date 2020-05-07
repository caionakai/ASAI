const express = require('express');
const router = express.Router();

//const world = require('./worldRouter');
//router.use('/world', world); //Example how to associate a file with a route

const reports= require('./reportsRouter');
router.use('/reports', reports);

module.exports = router;