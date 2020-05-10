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

const analytics = require('./analyticsRouter');
const client = require('./clienteRouter');
const photo = require('./photoRouter');
const keyword = require('./keywordRouter');
const photoKeyword = require('./photoKeywordRouter');
const page = require('./pageRouter');


router.use('/clients', client);
router.use('/photo', photo);
router.use('/keyword', keyword);
router.use('/photokeyword', photoKeyword);
router.use('/page', page);

router.use('/analytics', analytics);
router.use('/clients', client);

const reports= require('./reportsRouter');
router.use('/reports', reports);

module.exports = router;
