const express = require('express');
const router = express.Router();

const supplier = require('./supplierRouter')
router.use('/supplier', supplier);

const purchaseRequest = require('./purchaseRequestRouter')
router.use('/purchaseRequest', purchaseRequest);



module.exports = router;
