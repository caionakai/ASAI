const express = require('express');
const router = express.Router();

const supplier = require('./supplierRouter')
const candidate = require('./candidateRouter')
const employee = require('./employeeRouter')

router.use('/supplier', supplier);
router.use('/candidate', candidate);
router.use('/employee', employee);


module.exports = router;
