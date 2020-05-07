const express = require('express');
const router = express.Router();

//const world = require('./worldRouter');
//router.use('/world', world); //Example how to associate a file with a route

const analytics = require('./analyticsRouter');
const client = require('./clienteRouter');

router.use('/analytics', analytics);
router.use('/clients', client);


module.exports = router;
