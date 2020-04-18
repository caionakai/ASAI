  
const express = require('express');
const router = express.Router();

const world = require('./worldRouter');

router.use('/world', world);

module.exports = router;