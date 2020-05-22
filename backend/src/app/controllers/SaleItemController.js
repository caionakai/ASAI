const SaleItem = require('../models/SaleItem')

module.exports = {

  async listAll() {
    try {
        const sales = await SaleItem.findAll();

        return sales;

    } catch (error) {
        console.error("\nError in SaleItemController trying to list all sales \n\n", error);
    }
  },

  async getById(id) {
    try {
        const sale = await SaleItem.findAll({where: { sale_id: id }});
        return sale;
    } catch (error) {
        console.error("\nError in SaleItemController trying to get all SaleItems by a Sale ID \n\n", error);
    }
},

  async store(saleData) {
    try {
        const saleItem = await SaleItem.create({
        quantity: saleData.quantity,
        price: saleData.price,
        sale_id: saleData.sale_id,
        product_id: saleData.product_id,
        });

        return saleItem;

    } catch (error) {
        console.error("\nError in SaleItemController trying to create a saleItem \n\n", error);
    }
  },

}