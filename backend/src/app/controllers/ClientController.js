const Client = require('../models/Client')

module.exports = {

  async listAll() {
    try {
        const clients = await Client.findAll();

        return clients;

    } catch (error) {
        console.error("\nError in ClientController trying to list all clients \n\n", error);
    }
  },

  async store(clientData) {
    try {
        const client = await Client.create({ 
          name: clientData.name,
          address: clientData.address,
          phone: clientData.phone,
          email: clientData.email,
          preferredComunicationMethod: clientData.preferredComunicationMethod,
        });

        return client;

    } catch (error) {
        console.error("\nError in ClientController trying to create a client \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(clientId){
    try {
        const status = await Client.destroy({
            where: {
              id: clientId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in ClientController trying to delete a client \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(clientId, clientData){
    try {
        const client = await Client.update({
            name: clientData.name,
            address: clientData.address,
            phone: clientData.phone,
            email: clientData.email,
            preferredComunicationMethod: clientData.preferredComunicationMethod,
        },{
            where: {
                id: clientId
            }
        });

        return client;

    } catch (error) {
        console.error("\nError in ClientController trying to update a client by ID \n\n", error);
    }
  },

}