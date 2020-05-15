const Sale = require('../models/Sale')

module.exports = {

  async listAll() {
    try {
        const sales = await Sale.findAll();

        return sales;

    } catch (error) {
        console.error("\nError in SalesController trying to list all sales \n\n", error);
    }
  },

  async getById(id) {
    try {
        const sale = await Sale.findByPk(id);
        return sale;
    } catch (error) {
        console.error("\nError in SalesController trying to get a Sale by ID \n\n", error);
    }
},

  async store(saleData) {
    try {
        const sales = await Sale.create({
        purchase_date: saleData.purchase_date,
        discount_percentage: saleData.discount_percentage,
        client_id: saleData.client_id,
        seller_id: saleData.seller_id,
        });

        return sales;

    } catch (error) {
        console.error("\nError in SalesController trying to create a sale \n\n", error);
    }
  },

}