const express = require('express');
const router = express.Router();

const supplier = require('./supplierRouter')
const candidate = require('./candidateRouter')
const employee = require('./employeeRouter')
const interview = require('./interviewRouter')
const jobtype = require('./jobtypeRouter');
const product = require('./productRouter');
const sale = require('./saleRouter');
const saleItem = require('./saleItemRouter');

router.use('/supplier', supplier);
router.use('/candidate', candidate);
router.use('/employee', employee);
router.use('/interview', interview);
router.use('/jobtype', jobtype);
router.use('/sale', sale);
router.use('/saleItem', saleItem);
router.use('/product', product)

module.exports = router;
