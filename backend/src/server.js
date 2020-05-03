const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./app/routes/index');
require('./app/database'); //Initialize database

const app = express();

var corsOptions = {
  origin: '*', //Change this to the URL of frontend
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

const serverPort = 8000;

app.listen(serverPort, async () => {
  console.log(`\nServer started on port ${serverPort}.\n`);
});