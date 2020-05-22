const Interview = require('../models/JobType')

module.exports = {

  async listAll() {
    try {
        var clients = await Interview.findAll();
        return clients;

    } catch (error) {
        console.error("\nError in InterviewController trying to list all Interview \n\n", error);
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

}
