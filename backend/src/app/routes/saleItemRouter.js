const express = require('express');
const router = express.Router();

const SaleItemController = require('../controllers/SaleItemController');


//List all Sales
router.get('/', async (request, response) => {
  const sales = await SaleItemController.listAll();

  return response.json(sales);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const data = await SaleItemController.getById(id);

    if (!data) {
        return res.status(400).json({ error: 'Fail to create Sale Item' });
    }

    return res.send(data);
});


router.post('/', async(request, response) => {
  const { quantity, price, sale_id, product_id } = request.body;

  const saleData = {
    quantity,
    price,
    sale_id,
    product_id,
  }

    const sale = await SaleItemController.store(saleData)

    if(!sale){
      return response.status(400).json({ error: 'Fail to create SaleItem' });
    }

    return response.send(sale);
});

module.exports = router;