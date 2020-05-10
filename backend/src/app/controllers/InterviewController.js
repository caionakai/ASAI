const Interview = require('../models/Interview')
const Employee = require('../models/Employee')
const Candidate = require('../models/Candidate')

module.exports = {

  async listAll() {
    try {
        var clients = await Interview.findAll({raw: true, include: [{model: Employee, as:'employee'}, {model: Candidate, as:'candidate'}]});
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.id":').join('"candidate_id":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.address":').join('"candidate_address":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.phone":').join('"candidate_phone":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.email":').join('"candidate_email":'));
        clients = JSON.parse(JSON.stringify(clients).split('"employee.name":').join('"employee_name":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.name":').join('"candidate_name":'));
        return clients;

    } catch (error) {
        console.error("\nError in InterviewController trying to list all Interview \n\n", error);
    }
  },
  async getById(supplierId) {
      try {
        var clients = await Interview.findAll({where: {'id': supplierId},raw: true, include: [ {model: Candidate, as:'candidate'}]});
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.id":').join('"candidate_id":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.address":').join('"candidate_address":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.phone":').join('"candidate_phone":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.email":').join('"candidate_email":'));
        clients = JSON.parse(JSON.stringify(clients).split('"candidate.name":').join('"candidate_name":'));
        return clients;
      } catch (error) {
          console.error("\nError in supplierController trying to get a supplier by ID \n\n", error);
          return { successful: false, error: error };
      }
  },
  async store(clientData) {
    try {
        const client = await Interview.create({
          date: clientData.date,
          time: clientData.time,
          employee_id	: clientData.employee_id,
          candidate_id: clientData.candidate_id,
          isDone: 0
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
            id: clientId,
            date: clientData.date,
            time: clientData.time,
            employee_id	: clientData.employee_id,
            candidate_id: clientData.candidate_id,
            isDone: clientData.isDone,
            isPassed: clientData.isPassed,
            isEvaluated: clientData.isEvaluated,
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
