const Service = require('../models/Service')

module.exports = {
    async getById(serviceId) {
        try {
            return { successful: true, res: await Service.findByPk(serviceId) };
        } catch (error) {
            console.error("\nError in ServiceController trying to get a Service by ID \n\n", error);
            return { successful: false, error: error };
        }
    },


    async getAll() {
        try {
            const services = await Service.findAll();
            
            return services;
    
        } catch (error) {
            console.error("\nError in ServicesController trying to get all services \n\n", error);
        }
    },

    async save(service) {
        try {
            return { successful: true, res: await Service.create(service) };
        } catch (error) {
            console.error("\nError in ServiceController trying to create a service \n\n", error);
            return { successful: false, error: error };
        }
    },

    async update(serviceId, newService){
        try {
            await Service.update(newService, {
                where: {
                    id: serviceId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in ServiceController trying to update a service by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async delete(serviceId){
        try {
            await Service.destroy({
                where: {
                  id: serviceId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in serviceController trying to delete a service \n\n", error);
            return { successful: false, error: error };
        }
    }
}
