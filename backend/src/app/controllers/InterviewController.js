const Interview = require('../models/Interview')

module.exports = {

  async listAll() {
    try {
        const clients = await Interview.findAll();

        return clients;

    } catch (error) {
        console.error("\nError in InterviewController trying to list all Interview \n\n", error);
    }
  },

  async store(clientData) {
    try {
        const client = await Interview.create({
          date: clientData.date,
          time: clientData.time,
          employee_id	: clientData.employee_id,
          candidate_id: clientData.candidate_id
        });

        return client;

    } catch (error) {
        console.error("\nError in InterviewController trying to create a Interview \n\n", error);
    }
  },

  //Return 0 on error or 1 in sucess
  async delete(clientId){
    try {
        const status = await Interview.destroy({
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
        const client = await Interview.update({
            date: clientData.date,
            time: clientData.time,
            employee_id	: clientData.employee_id,
            candidate_id: clientData.candidate_id
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
