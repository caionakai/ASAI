const purchaseRequest = require('../models/PurchaseRequest')

module.exports = {
    async getById(purchaseRequestId) {
        try {
            return { successful: true, res: await purchaseRequest.findByPk(purchaseRequestId) };
        } catch (error) {
            console.error("\nError in purchaseRequestController trying to get a purchaseRequest by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async getAll() {
        try {
            return { successful: true, res: await purchaseRequest.findAll() };
        } catch (error) {
            console.error("\nError in purchaseRequest trying to get all purchaseRequest \n\n", error);
            return { successful: false, error: error };
        }
    },

    async save(newPurchaseRequest) {
        try {
            return { successful: true, res: await purchaseRequest.create(newPurchaseRequest) };
        } catch (error) {
            console.error("\nError in purchaseRequest trying to create a purchaseRequest \n\n", error);
            return { successful: false, error: error };
        }
    },

    async update(purchaseRequestId, newPurchaseRequest){
        try {
            await purchaseRequest.update(newPurchaseRequest, {
                where: {
                    id: purchaseRequestId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in purchaseRequest trying to update a purchaseRequest by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async delete(purchaseRequestId){
        try {
            await purchaseRequest.destroy({
                where: {
                  id: purchaseRequestId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in purchaseRequestController trying to delete a purchaseRequest \n\n", error);
            return { successful: false, error: error };
        }
    }
}
