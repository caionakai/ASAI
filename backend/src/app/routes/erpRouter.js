const express = require('express');
const router = express.Router();

const supplier = require('./supplierRouter')
router.use('/supplier', supplier);

const brand = require('./brandRouter')
router.use('/brand', brand);

const store = require('./storeRouter')
router.use('/store', store);

const stock = require('./stockRouter')
router.use('/stock', stock);

module.exports = router;
