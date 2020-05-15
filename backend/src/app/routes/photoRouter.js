const express = require('express');
const router = express.Router();

const PhotoController = require('../controllers/photoController');


//List all photos
router.get('/', async (request, response) => {
  const photos = await PhotoController.listAll();

  return response.json(photos);
});


router.post('/', async(request, response) => {
  const {likes, comments, product_id} = request.body;

  const photoData = {
    likes,
    comments,
    product_id
  }
    const contact = await PhotoController.store(photoData)

    if(!contact){
      return response.status(400).json({ error: 'Fail to create Photo' });
    }

    return response.send(contact);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const photo = await PhotoController.getById(id);

  if(!photo){
      return res.status(400).json({ error: `Fail to find a photo with the id ${id}` });
  }

  return res.send(photo);
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const status = await PhotoController.delete(id);

  if(!status){
      return response.status(400).json({ error: `The photo with the id ${id} doesn't exist` });
  }

  return response.send({msg: "photo deleted successfully"});
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {likes, comments, product_id} = request.body;

  const photoData = {
    likes,
    comments,
    product_id
  }

  const photo  = await PhotoController.update(id, photoData);

  if(!photo){
      return response.status(400).json({ error: `Fail to update or nothing changed on photo with the id ${id}` });
  }

  return response.send({msg: "photo updated successfully"});
});





module.exports = router;