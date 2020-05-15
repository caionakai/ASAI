const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');


//List all Clients
router.get('/', async (request, response) => {
  const products = await ProductController.listAll();

  return response.json(products);
});


module.exports = router;