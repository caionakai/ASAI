const express = require('express');
const router = express.Router();

const service_type = require('./serviceTypeRouter');
router.use('/service_types', service_type);


const service = require('./serviceRouter');
router.use('/services', service);

const feedback = require('./feedbackRouter');
router.use('/feedbacks', feedback);
//const world = require('./worldRouter');
//router.use('/world', world); //Example how to associate a file with a route

<<<<<<< HEAD
const analytics = require('./analyticsRouter');
const client = require('./clienteRouter');

router.use('/analytics', analytics);
router.use('/clients', client);


module.exports = router;
=======
const reports= require('./reportsRouter');
router.use('/reports', reports);

module.exports = router;
>>>>>>> reports route
