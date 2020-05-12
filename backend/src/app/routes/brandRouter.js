const express = require('express');
const router = express.Router();

const BrandController = require('../controllers/brandController');


//List all brands
router.get('/', async (request, response) => {
  const brands = await BrandController.listAll();

  return response.json(brands);
});


router.post('/', async(request, response) => {
  const {name} = request.body;

  const brandData = {
    name
  }


    const contact = await BrandController.store(brandData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create brand' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await BrandController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The brand with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Brand deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {name} = request.body;

  const brandData = {
    name
  }

  const brand  = await BrandController.update(id, brandData);

  if(!brand){
      return response.status(400).json({ error: `Fail to update or nothing changed on brand with the id ${id}` });
  }

  return response.send({msg: "Brand updated successfully"});
});





module.exports = router;