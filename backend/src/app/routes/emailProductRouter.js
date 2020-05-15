const express = require('express');
const router = express.Router();

const EmailProductController = require('../controllers/EmailProductController');


//List all Sales
router.get('/', async (request, response) => {
  const emails = await EmailProductController.listAll();

  return response.json(emails);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const data = await EmailProductController.getById(id);

    if (!data) {
        return res.status(400).json({ error: 'Fail to create Email Product' });
    }

    return res.send(data);
});


router.post('/', async(request, response) => {
  const { product_id, email_id } = request.body;

  const emailData = {
    product_id,
    email_id,
  }

    const email = await EmailProductController.store(emailData)

    if(!email){
      return response.status(400).json({ error: 'Fail to create EmailProduct' });
    }

    return response.send(email);
});

module.exports = router;