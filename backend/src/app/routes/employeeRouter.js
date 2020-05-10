const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController');


//List all Clients
router.get('/', async (request, response) => {
  const clients = await EmployeeController.listAll();

  return response.json(clients);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const response = await EmployeeController.getById(id);

    if(!response['successful']){
        return error(response, res)
    }

    return res.send(response);
});

router.post('/', async(request, response) => {
  const {name, address, phone, email, nif,job_id} = request.body;

  const clientData = {
    name,
    address,
    phone,
    email,
    nif,
    job_id
  }

    const contact = await EmployeeController.store(clientData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create candidate' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await EmployeeController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The candidate with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Candidate deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {name, address, phone, email, nif,job_id} = request.body;

  const clientData = {
    name,
    address,
    phone,
    email,
    nif,
    job_id
  }

  const client  = await EmployeeController.update(id, clientData);

  if(!client){
      return response.status(400).json({ error: `Fail to update or nothing changed on candidate with the id ${id}` });
  }

  return response.send({msg: "Candidate updated successfully"});
});





module.exports = router;
