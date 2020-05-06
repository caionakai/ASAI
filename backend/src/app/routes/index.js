const express = require('express');
const router = express.Router();
const erpRouter = require('./erpRouter');
const crmRouter = require('./crmRouter');

router.use('/erp', erpRouter);
router.use('/crm', crmRouter);

module.exports = router;