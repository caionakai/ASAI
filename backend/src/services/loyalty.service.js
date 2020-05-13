import db from "../connection";

function create(name, description) {
  return new Promise((resolve, reject) =>
    db.query(
      "INSERT INTO `Loyalty`(`name`, `description`) VALUES (?, ?)",
      [name, description],
      (err, results, fields) => {
        if (err) reject(err);
        console.log(results);
        resolve(results);
      }
    )
  );
}

function list() {
  return new Promise((resolve, reject) =>
    db.query("SELECT * FROM `Loyalty`", (err, results, fields) => {
      if (err) reject(err);
      resolve(results);
    })
  );
}

function fetch(id) {
  return new Promise((resolve, reject) =>
    db.query(
      "SELECT * FROM `Loyalty` WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      }
    )
  );
}

function edit(id, name, description) {
  return new Promise((resolve, reject) =>
    db.query(
      "UPDATE `Loyalty` SET `name`= ?,`description`= ? WHERE id = ?",
      [name, description, Number(id)],
      (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      }
    )
  );
}

export default { create, list, fetch, edit };
