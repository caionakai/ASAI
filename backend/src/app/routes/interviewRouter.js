const express = require('express');
const router = express.Router();

const InterviewController = require('../controllers/InterviewController');

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

router.post('/', async(request, response) => {
  const {date,
  time,
  employee_id,
  candidate_id} = request.body;

  const clientData = {
    date,
    time,
    employee_id,
    candidate_id
  }

    const contact = await InterviewController.store(clientData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create candidate' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await InterviewController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The interview with the id ${id} doesn't exist` });
  }

  return response.send({msg: "interview deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {  date,time,employee_id,candidate_id,isDone,isPassed,isEvaluated} = request.body;

  const clientData = {
    date,
    time,
    employee_id,
    candidate_id,
    isDone,
    isPassed,
    isEvaluated,
  }

  const client  = await InterviewController.update(id, clientData);

  if(!client){
      return response.status(400).json({ error: `Fail to update or nothing changed on interview with the id ${id}` });
  }

  return response.send({msg: "interview updated successfully"});
});





module.exports = router;
