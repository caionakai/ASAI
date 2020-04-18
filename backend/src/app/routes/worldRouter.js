const express = require('express');
const router = express.Router();

const worldController = require("../controllers/worldController");

//List all worlds
router.get('/', async (req, res) => {
    const words = await worldController.listAll();

    return res.send(words);
});

//List a world by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const world = await worldController.listById(id);

    if(!world){
        return res.status(400).json({ error: `Fail to find a world with the id ${id}` });
    }

    return res.send(world);
});

//Create new world
router.post('/', async (req, res) => {
    const { name } = req.body;

    const world = await worldController.store(name);

    if(!world){
        return res.status(400).json({ error: 'Fail to create world' });
    }

    return res.send(world);
});

//Update a world by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const [ world ] = await worldController.update(id, name);

    if(!world){
        return res.status(400).json({ error: `Fail to update or nothing changed on world with the id ${id}` });
    }

    return res.send({msg: "World updated successfully"});
});

//Delete a world by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const status = await worldController.delete(id);

    if(!status){
        return res.status(400).json({ error: `The world with the id ${id} doesn't exist` });
    }

    return res.send({msg: "World deleted successfully"});
});

module.exports = router;