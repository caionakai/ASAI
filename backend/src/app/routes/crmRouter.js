const express = require('express');
const router = express.Router();

//const world = require('./worldRouter');
//router.use('/world', world); //Example how to associate a file with a route

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

module.exports = router;