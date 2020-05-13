const express = require('express');
const router = express.Router();

const StockController = require('../controllers/stockController');



//List all stocks
router.get('/', async (request, response) => {
  const stocks = await StockController.listAll();

  return response.json(stocks);
});


router.post('/', async(request, response) => {
  const {store_id, product_id} = request.body;

  const stockData = {
    store_id,
    product_id
  }


    const contact = await StockController.store(stockData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create stock' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await StockController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The Stock with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Stock deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {store_id, product_id} = request.body;

  const stockData = {
    store_id,
    product_id
  }

  const stock  = await StockController.update(id, stockData);

  if(!stock){
      return response.status(400).json({ error: `Fail to update or nothing changed on stock with the id ${id}` });
  }

  return response.send({msg: "Stock updated successfully"});
});





module.exports = router;