const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/supplierController");

const isTimeout = (response) => { return response['error']['parent']['errorno'] == 'ETIMEDOUT' }

const timeout = (res) => { return res.status(504).json({ successful: false, error: 'Timeout'}) }
const undefinedError = (res) => { return res.status(400).json({ successful: false, error: `Fail to get all suppliers` }) }
const error = (response, res) => { return isTimeout(response)? timeout(res) : undefinedError(res) }


router.get('/', async (req, res) => {
    const response = await supplierController.getAll();

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await supplierController.getById(id);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.post('/', async (req, res) => {
    const response = await supplierController.save(req.body);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await supplierController.update(id, req.body);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await supplierController.delete(id);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

module.exports = router;
