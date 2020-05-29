const express = require('express');
const router = express.Router();

const LeadItemController = require("../controllers/LeadItemController");

//List all leads
router.get('/', async (req, res) => {
    const leads = await LeadItemController.listAll();

    return res.json(leads);;
});

//Create new lead
router.post('/', async (req, res) => {
    const { lead, company, person, age, gender, phone, description } = req.body;
     
    const leadData = { lead, company, person, age, gender, phone, description }

    const theLead = await LeadItemController.store(leadData);

    if(!theLead){
        return res.status(400).json({ error: 'Fail to create lead' });
    }

    return res.send(theLead);
});

module.exports = router;