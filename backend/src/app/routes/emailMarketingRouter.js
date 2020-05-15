const express = require('express');
const router = express.Router();

const EmailMarketingController = require('../controllers/EmailMarketingController');


//List all emails
router.get('/', async (request, response) => {
  const emails = await EmailMarketingController.listAll();

  return response.json(emails);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await EmailMarketingController.getById(id);

  if (!data) {
    return res.status(400).json({ error: 'Fail to create Email' });
  }

  return res.send(data);
});


router.post('/', async (request, response) => {
  const { receiver, mail_date, subject, text } = request.body;

  const emailData = {
    receiver,
    mail_date,
    subject,
    text,
  }

  const email = await EmailMarketingController.store(emailData);
  if (email) {
    const sendEmail = await EmailMarketingController.send(emailData);
  } else {
    return response.status(400).json({ error: 'Fail to create Email' });
  }

  return response.send(email);
});

module.exports = router;