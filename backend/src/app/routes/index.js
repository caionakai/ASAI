  
const express = require('express');
const router = express.Router();

const helloWorld = require('./helloWorldRouter');

router.use('/hello', helloWorld);

module.exports = router;