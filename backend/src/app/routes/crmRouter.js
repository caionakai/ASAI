const express = require('express');
const router = express.Router();

const service_type = require('./serviceTypeRouter');
router.use('/service_types', service_type);


const service = require('./serviceRouter');
router.use('/services', service);
//const world = require('./worldRouter');
//router.use('/world', world); //Example how to associate a file with a route

module.exports = router;