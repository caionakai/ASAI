import db from "../connection";

function create(client_id, loyalty_id, offer_id, sale_id) {
  return new Promise((resolve, reject) =>
    db.query(
      "INSERT INTO `Marketing`(`id`, `client_id`, `loyalty_id`, `offer_id`, `sale_id`) VALUES (NULL, ?, ?, ?, ?)",
      [client_id, loyalty_id, offer_id, sale_id],
      (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      }
    )
  );
}

function fetch(id) {
  return new Promise((resolve, reject) =>
    db.query(
      `SELECT * FROM Marketing 
        JOIN Client ON Marketing.client_id = Client.id 
        JOIN Loyalty ON Marketing.loyalty_id = Loyalty.id 
        JOIN SpecialOffer ON Marketing.offer_id = SpecialOffer.id 
        JOIN Sale ON Marketing.sale_id = Sale.id 
        WHERE Marketing.id = ?`,
      [id],
      (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      }
    )
  );
}

function list() {
  return new Promise((resolve, reject) =>
    db.query(
      `SELECT * FROM Marketing 
        JOIN Client ON Marketing.client_id = Client.id 
        JOIN Loyalty ON Marketing.loyalty_id = Loyalty.id 
        JOIN SpecialOffer ON Marketing.offer_id = SpecialOffer.id 
        JOIN Sale ON Marketing.sale_id = Sale.id `,
      (err, results, fields) => {
        if (err) reject(err);
        resolve(results);
      }
    )
  );
}

export default { create, list, fetch };
