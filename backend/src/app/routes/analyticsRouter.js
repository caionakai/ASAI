const express = require('express');
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

const isTimeout = (response) => { return response['error']['parent']['errorno'] == 'ETIMEDOUT' }

const timeout = (res) => { return res.status(504).json({ successful: false, error: 'Timeout'}) }
const undefinedError = (res) => { return res.status(400).json({ successful: false, error: `Fail to analytics` }) }
const error = (response, res) => { return isTimeout(response)? timeout(res) : undefinedError(res) }

router.get('/:year', async (req, res) => {
    const { year } = req.params;

    const response = await analyticsController.salesByMonthForYear(year);

    if(!response['successful']){
        return res.send(error(response, res))
    }
console.log(response)
    return res.send(response);
});

module.exports = router;
