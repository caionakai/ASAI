const Store = require('../models/Store')

module.exports = {

  async listAll() {
    try {
        const stores = await Store.findAll();

        return stores;

    } catch (error) {
        console.error("\nError in StoreController trying to list all stores \n\n", error);
    }
  },

  async store(storeData) {
    try {
        const store = await Store.create({
          name: storeData.name
        });

        return store;

    } catch (error) {
        console.error("\nError in StoreController trying to create a store \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(storeId){
    try {
        const status = await Store.destroy({
            where: {
              id: storeId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in StoreController trying to delete a Store \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(storeId, storeData){
    try {
        const store = await Store.update({
            name: storeData.name
        },{
            where: {
                id: storeId
            }
        });

        return store;

    } catch (error) {
        console.error("\nError in StoreController trying to update a store by ID \n\n", error);
    }
  },

}