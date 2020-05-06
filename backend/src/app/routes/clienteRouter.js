const express = require('express');
const router = express.Router();

const ClientController = require('../controllers/ClientController');


//List all Clients
router.get('/', async (request, response) => {
  const clients = await ClientController.listAll();

  return response.json(clients);
});


router.post('/', async(request, response) => {
  const {name, address, phone, email, preferredComunicationMethod} = request.body;

  const clientData = {
    name,
    address,
    phone,
    email,
    preferredComunicationMethod,
  }


    const contact = await ClientController.store(clientData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Client' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await ClientController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The Client with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Client deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const client  = await ClientController.update(id, name);

  if(!client){
      return response.status(400).json({ error: `Fail to update or nothing changed on client with the id ${id}` });
  }

  return response.send({msg: "Client updated successfully"});
});





module.exports = router;