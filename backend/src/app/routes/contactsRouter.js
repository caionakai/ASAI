const express = require('express');
const router = express.Router();

const ContatcsController = require('../controllers/ContactsController');
const SearchContatcsController = require('../controllers/SearchContactsController');

router.post('/', ContatcsController.store);
router.get('/', ContatcsController.index);
router.delete('/:id', ContatcsController.delete);
router.put('/:id', ContatcsController.update);
// router.get('/search/:id', SearchContatcsController.findContact);

module.exports = router;