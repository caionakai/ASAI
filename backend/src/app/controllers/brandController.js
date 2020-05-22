const Brand = require('../models/Brand')

module.exports = {

  async listAll() {
    try {
        const brands = await Brand.findAll();

        return brands;

    } catch (error) {
        console.error("\nError in BrandController trying to list all brands \n\n", error);
    }
  },

  async store(brandData) {
    try {
        const brand = await Brand.create({
          name: brandData.name
        });

        return brand;

    } catch (error) {
        console.error("\nError in BrandController trying to create a brand \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(brandId){
    try {
        const status = await Brand.destroy({
            where: {
              id: brandId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in BrandController trying to delete a brand \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(brandId, brandData){
    try {
        const brand = await Brand.update({
            name: brandData.name
        },{
            where: {
                id: brandId
            }
        });

        return brand;

    } catch (error) {
        console.error("\nError in BrandController trying to update a brand by ID \n\n", error);
    }
  },

}