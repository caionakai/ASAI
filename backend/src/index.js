import express from "express";
import cors from "cors";

import routes from "./routes";
import db from "./connection";

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3333;

const app = express();

db.getConnection((err, connection) => {
  console.log("> connecting to database...");
  if (err) {
    console.log(`> error connecting:\n${err.stack}`);
  }
  console.log("> connected");
  connection.release();
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`
    ------------------------
    Running on: ${ENV}
    Listening @ PORT:${PORT}
    ------------------------
  `);
});
