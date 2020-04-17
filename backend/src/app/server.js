const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

var corsOptions = {
  origin: '*', //Change this to the URL of frontend
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, async () => {
  console.log("\nServer started on port 3000.\n");
});