const express = require('express');
const router = express.Router();

const PhotoKeywordController = require('../controllers/photoKeywordController');


//List all photo keywords
router.get('/', async (request, response) => {
  const photoKeywords = await PhotoKeywordController.listAll();

  return response.json(photoKeywords);
});


router.post('/', async(request, response) => {
  const {photo_id, keyword_id, preferredComunicationMethod} = request.body;

  const photoKeywordData = {
    photo_id,
    keyword_id,
    preferredComunicationMethod
  }


    const contact = await PhotoKeywordController.store(photoKeywordData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Photo Keyword' });
    }

    return response.send(contact);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await PhotoKeywordController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The Photokeyword with the id ${id} doesn't exist` });
  }

  return response.send({msg: "Photokeyword deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {photo_id, keyword_id, preferredComunicationMethod} = request.body;

  const photoKeywordData = {
    photo_id,
    keyword_id,
    preferredComunicationMethod
  }

  const photoKeyword  = await PhotoKeywordController.update(id, photoKeywordData);

  if(!photoKeyword){
      return response.status(400).json({ error: `Fail to update or nothing changed on Photokeyword with the id ${id}` });
  }

  return response.send({msg: "Photokeyword updated successfully"});
});





module.exports = router;