const express = require('express');
const router = express.Router();

const PageController = require('../controllers/pageController');


//List all pages
router.get('/', async (request, response) => {
  const pages = await PageController.listAll();

  return response.json(pages);
});


router.post('/', async(request, response) => {
  const {name} = request.body;

  const pageData = {
    name
  }


    const contact = await PageController.store(pageData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Page' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await PageController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The Page with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Page deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {name} = request.body;

  const pageData = {
    name
  }

  const page  = await PageController.update(id, pageData);

  if(!page){
      return response.status(400).json({ error: `Fail to update or nothing changed on page with the id ${id}` });
  }

  return response.send({msg: "Page updated successfully"});
});





module.exports = router;