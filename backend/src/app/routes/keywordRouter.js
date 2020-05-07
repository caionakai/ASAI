const express = require('express');
const router = express.Router();

const KeywordController = require('../controllers/keywordController');


//List all Keywords
router.get('/', async (request, response) => {
  const keywords = await KeywordController.listAll();

  return response.json(keywords);
});


router.post('/', async(request, response) => {
  const {word, preferredComunicationMethod} = request.body;

  const keywordData = {
    word,
    preferredComunicationMethod
  }


    const contact = await KeywordController.store(keywordData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Keyword' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await KeywordController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The Keyword with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Keyword deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {word, preferredComunicationMethod} = request.body;

  const keywordData = {
    word,
    preferredComunicationMethod,
  }

  const keyword  = await KeywordController.update(id, keywordData);

  if(!keyword){
      return response.status(400).json({ error: `Fail to update or nothing changed on keyword with the id ${id}` });
  }

  return response.send({msg: "Keyword updated successfully"});
});





module.exports = router;