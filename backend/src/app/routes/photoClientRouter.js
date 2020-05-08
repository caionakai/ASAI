const express = require('express');
const router = express.Router();

const PhotoClientController = require('../controllers/photoClientController');


//List all photo clients
router.get('/', async (request, response) => {
  const photoClients = await PhotoClientController.listAll();

  return response.json(photoClients);
});


router.post('/', async(request, response) => {
  const {photo_id, client_id} = request.body;

  const photoClientData = {
    photo_id,
    client_id
  }


    const contact = await PhotoClientController.store(photoClientData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Photo Client' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await PhotoClientController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The PhotoClient with the id ${id} doesn't exist` });
  }

  return response.send({msg: "PhotoClient deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {photo_id, client_id} = request.body;

  const photoClientData = {
    photo_id,
    client_id
  }

  const photoClient  = await PhotoClientController.update(id, photoClientData);

  if(!photoClient){
      return response.status(400).json({ error: `Fail to update or nothing changed on PhotoClient with the id ${id}` });
  }

  return response.send({msg: "PhotoClient updated successfully"});
});





module.exports = router;