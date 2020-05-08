const express = require('express');
const router = express.Router();

const InterviewController = require('../controllers/jobtypeController');

//List all Clients
router.get('/', async (request, response) => {
  const clients = await InterviewController.listAll();
  return response.json(clients);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await InterviewController.getById(id);

    return res.json(response[0]);
});



router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await InterviewController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The interview with the id ${id} doesn't exist` });
  }

  return response.send({msg: "interview deleted successfully"});
});


module.exports = router;
