const express = require('express');
const router = express.Router();

const SaleController = require('../controllers/SaleController');


//List all Sales
router.get('/', async (request, response) => {
  const sales = await SaleController.listAll();

  return response.json(sales);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const data = await SaleController.getById(id);

    if (!data) {
        return res.status(400).json({ error: 'Fail to create Sale' });
    }

    return res.send(data);
});


router.post('/', async(request, response) => {
  const { purchase_date, client_id, discount_percentage, seller_id } = request.body;

  const saleData = {
    purchase_date,
    client_id,
    discount_percentage,
    seller_id,
  }

    const sale = await SaleController.store(saleData)

    if(!sale){
      return response.status(400).json({ error: 'Fail to create Sale' });
    }

    return response.send(sale);
});

module.exports = router;