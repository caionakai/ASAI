const express = require('express');
const router = express.Router();

const helloWorldController = require("../controllers/helloWorldController");

router.get('/', async (req, res) => {
    const hello = await helloWorldController.introduction();

    return res.send(hello);
});

module.exports = router;