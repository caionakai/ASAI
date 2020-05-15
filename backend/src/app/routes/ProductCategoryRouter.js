const express = require('express');
const router = express.Router();

const ProductCategory = require('../controllers/ProductCategoryController');


//List all Clients
router.get('/', async (request, response) => {
  const productcategory = await ProductCategory.listAll();

  return response.json(productcategory);
});


router.post('/', async(request, response) => {
  const {name} = request.body;

  const productcategory = {
    name,
  }


    const contact = await ProductCategory.store(productcategory)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create product category' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await ProductCategory.delete(id);

  if(!status){
      return response.status(400).json({ error: `The product category with the id ${id} doesn't exist` });
  }

  return response.send({msg: "product category deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {name} = request.body;

  const productcategory = {
    name,
  }

  const client  = await ProductCategory.update(id, productcategoryData);

  if(!client){
      return response.status(400).json({ error: `Fail to update or nothing changed on product category with the id ${id}` });
  }

  return response.send({msg: "product category updated successfully"});
});





module.exports = router;