const express = require('express');
const router = express.Router();

const supplier = require('./supplierRouter')
const candidate = require('./candidateRouter')
const employee = require('./employeeRouter')
const interview = require('./interviewRouter')
const jobtype = require('./jobtypeRouter');

router.use('/supplier', supplier);
router.use('/candidate', candidate);
router.use('/employee', employee);
router.use('/interview', interview);
router.use('/jobtype', jobtype);

const brand = require('./brandRouter')
router.use('/brand', brand);

const store = require('./storeRouter')
router.use('/store', store);

const stock = require('./stockRouter')
router.use('/stock', stock);

module.exports = router;
