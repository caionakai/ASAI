  
const express = require('express');
const router = express.Router();

const world = require('./worldRouter');
const contacts = require('./contactsRouter');

router.use('/world', world);
router.use('/contacts',contacts);

module.exports = router;