const Product = require('../models/Product')

module.exports = {

  async listAll() {
    try {
        const products = await Product.findAll();

        return products;

    } catch (error) {
        console.error("\nError in ProductController trying to list all products \n\n", error);
    }
  },

}