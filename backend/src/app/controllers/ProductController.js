const Product = require('../models/Product')
const Brand = require('../models/Brand')


module.exports = {

  async listAll() {
    try {
        var myjoin = await Product.findAll({raw: true, include: [{model: Brand, as:'Brand'}]});
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Product.id":').join('"product_id":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Product.name":').join('"product_name":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"Brand.name":').join('"Brand_name":'));
        myjoin = JSON.parse(JSON.stringify(myjoin).split('"product.quantity":').join('"quantity":'));
        return myjoin;

    } catch (error) {
        console.error("\nError in StockController trying to list all Stocks \n\n", error);
    }
  },

  async store(productData) {
    try {
        const product = await Product.create({ 
          name: productData.name,
          quantity: productData.quantity,
          price: productData.price,
        });

        return product;

    } catch (error) {
        console.error("\nError in ProductController trying to create a product \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(productId){
    try {
        const status = await Product.destroy({
            where: {
              id: productId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in ProductController trying to delete a product \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(productId, productData){
    try {
        const product = await Product.update({
            name: productData.name,
            quantity: productData.quantity,
            price: productData.price,
        },{
            where: {
                id: productId
            }
        });

        return product;

    } catch (error) {
        console.error("\nError in ProductController trying to update a product by ID \n\n", error);
    }
  },

}