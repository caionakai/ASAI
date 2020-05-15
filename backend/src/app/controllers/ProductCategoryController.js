const ProductCategory = require('../models/ProductCategory')

//const Product = require('../models/Product')


module.exports = {


 async listAll() {
    try {
        const products = await ProductCategory.findAll();

        return products;

    } catch (error) {
        console.error("\nError in ProductController trying to list all products \n\n", error);
    }
  },

  async store(ProductCategoryData) {
    try {
        const productcategory = await ProductCategory.create({ 
          name: productcategory.name,
        });

        return productcategory;

    } catch (error) {
        console.error("\nError in ProductCategory trying to create a product category \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(ProductCategory){
    try {
        const productcategory = await ProductCategory.destroy({
            where: {
              id: productcategory
            }
        });

        return productcategory;

    } catch (error) {
        console.error("\nError in ProductCategory trying to delete a Product Category \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(ProductCategoryId, ProductCategoryData){
    try {
        const productcategory = await ProductCategory.update({
            productcategory: productcategory.name,
        },{
            where: {
                id: productcategory
            }
        });

        return productcategory;

    } catch (error) {
        console.error("\nError in ProductCategory trying to update a Product Category by ID \n\n", error);
    }
  },

}