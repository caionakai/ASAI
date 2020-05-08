const ServiceType = require('../models/ServiceType')

module.exports = {
    async getById(servicetypeId) {
        try {
            return { successful: true, res: await ServiceType.findByPk(servicetypeId) };
        } catch (error) {
            console.error("\nError in ServiceTypeController trying to get a ServiceType by ID \n\n", error);
            return { successful: false, error: error };
        }
    },


    async getAll() {
        try {
            const servicetypes = await ServiceType.findAll();
            
            return servicetypes;
    
        } catch (error) {
            console.error("\nError in ServiceTypeController trying to get all service types \n\n", error);
        }
    },

    async save(serviceType) {
        try {
            return { successful: true, res: await ServiceType.create(serviceType) };
        } catch (error) {
            console.error("\nError in ServiceTypeController trying to create a service type \n\n", error);
            return { successful: false, error: error };
        }
    },

    async update(servicetypeId, newServiceType){
        try {
            await ServiceType.update(newServiceType, {
                where: {
                    id: servicetypeId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in ServiceTypeController trying to update a service type by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async delete(servicetypeId){
        try {
            await ServiceType.destroy({
                where: {
                  id: servicetypeId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in serviceTypeController trying to delete a service type \n\n", error);
            return { successful: false, error: error };
        }
    }
}
