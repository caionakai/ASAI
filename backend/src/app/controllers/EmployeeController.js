const Employee = require('../models/Employee')

module.exports = {

  async getById(id) {
      try {
          return { successful: true, res: await Employee.findByPk(id) };
      } catch (error) {
          console.error("\nError in CandidateController trying to get a Candidate by ID \n\n", error);
          return { successful: false, error: error };
      }
  },

  async listAll() {
    try {
        const clients = await Employee.findAll();

        return clients;

    } catch (error) {
        console.error("\nError in CandidateController trying to list all candidates \n\n", error);
    }
  },

  async store(clientData) {
    try {
        const client = await Employee.create({
          name: clientData.name,
          address: clientData.address,
          phone: clientData.phone,
          email: clientData.email,
          nif: clientData.nif
        });

        return client;

    } catch (error) {
        console.error("\nError in CandidateController trying to create a candidate \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(clientId){
    try {
        const status = await Employee.destroy({
            where: {
              id: clientId
            }
        });

        return status;

    } catch (error) {
        console.error("\nError in CandidateController trying to delete a candidate \n\n", error);
    }
  },

  //Return an array with 0 on error or 1 in sucess
  async update(clientId, clientData){
    try {
        const client = await Employee.update({
            name: clientData.name,
            address: clientData.address,
            phone: clientData.phone,
            email: clientData.email,
            nif: clientData.nif
        },{
            where: {
                id: clientId
            }
        });

        return client;

    } catch (error) {
        console.error("\nError in CandidateController trying to update a candidate by ID \n\n", error);
    }
  },

}
