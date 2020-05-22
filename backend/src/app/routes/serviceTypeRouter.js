const express = require('express');
const router = express.Router();
const serviceTypeController = require("../controllers/serviceTypeController");

const isTimeout = (response) => { return response['error']['parent']['errorno'] == 'ETIMEDOUT' }

const timeout = (res) => { return res.status(504).json({ successful: false, error: 'Timeout'}) }
const undefinedError = (res) => { return res.status(400).json({ successful: false, error: `Fail to get all the service types` }) }
const error = (response, res) => { return isTimeout(response)? timeout(res) : undefinedError(res) }


router.get('/', async (request, response) => {
    const clients = await serviceTypeController.getAll();

    return response.json(clients);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await serviceTypeController.getById(id);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.post('/', async (req, res) => {
    const response = await serviceTypeController.save(req.body);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await serviceTypeController.update(id, req.body);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await serviceTypeController.delete(id);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

module.exports = router;
