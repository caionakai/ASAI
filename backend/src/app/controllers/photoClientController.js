const PhotoClient = require('../models/PhotoClient')

module.exports = {

  async listAll() {
    try {
        const photoClients = await PhotoClient.findAll();

        return photoClients;

    } catch (error) {
        console.error("\nError in PhotoClientController trying to list all photoClients \n\n", error);
    }
  },

  async store(photoClientData) {
    try {
        const photoClient = await PhotoClient.create({ 
          photo_id: photoClientData.photo_id,
          client_id: photoClientData.client_id
        });

        return photoClient;

    } catch (error) {
        console.error("\nError in PhotoClientController trying to create a photoClient \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(photoClientId){
    try {
        const status = await PhotoClient.destroy({
            where: {
              id: photoClientId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in PhotoClientController trying to delete a photoClient \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(photoClientId, photoClientData){
    try {
        const photoClient = await PhotoClient.update({
            photo_id: photoClientData.photo_id,
            client_id: photoClientData.client_id
        },{
            where: {
                id: photoClientId
            }
        });

        return photoClient;

    } catch (error) {
        console.error("\nError in PhotoClientController trying to update a photoClient by ID \n\n", error);
    }
  },

}