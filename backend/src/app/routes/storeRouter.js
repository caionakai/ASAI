const express = require('express');
const router = express.Router();

const StoreController = require('../controllers/storeController');


//List all stores
router.get('/', async (request, response) => {
  const stores = await StoreController.listAll();

  return response.json(stores);
});


router.post('/', async(request, response) => {
  const {name} = request.body;

  const storeData = {
    name
  }


    const contact = await StoreController.store(storeData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create store' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await StoreController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The store with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Store deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {name} = request.body;

  const storeData = {
    name
  }

  const store  = await StoreController.update(id, storeData);

  if(!store){
      return response.status(400).json({ error: `Fail to update or nothing changed on store with the id ${id}` });
  }

  return response.send({msg: "Store updated successfully"});
});





module.exports = router;