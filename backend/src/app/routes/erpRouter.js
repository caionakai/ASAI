const express = require('express');
const router = express.Router();

const supplier = require('./supplierRouter')
router.use('/supplier', supplier);

module.exports = router;
