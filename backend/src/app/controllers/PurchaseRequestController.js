const Supplier = require('../models/Supplier')

module.exports = {
    async getById(PurchaseRequestId) {
        try {
            return { successful: true, res: await Supplier.findByPk(PurchaseRequestId) };
        } catch (error) {
            console.error("\nError in PurchaseRequestController trying to get a PurchaseRequest by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async getAll() {
        try {
            return { successful: true, res: await PurchaseRequest.findAll() };
        } catch (error) {
            console.error("\nError in PurchaseRequest trying to get all PurchaseRequest \n\n", error);
            return { successful: false, error: error };
        }
    },

    async save(PurchaseRequest) {
        try {
            return { successful: true, res: await PurchaseRequest.create(PurchaseRequest) };
        } catch (error) {
            console.error("\nError in PurchaseRequest trying to create a PurchaseRequest \n\n", error);
            return { successful: false, error: error };
        }
    },

    async update(PurchaseRequestId, newPurchaseRequest){
        try {
            await PurchaseRequest.update(newPurchaseRequest, {
                where: {
                    id: PurchaseRequestId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in PurchaseRequest trying to update a PurchaseRequest by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async delete(PurchaseRequestId){
        try {
            await PurchaseRequest.destroy({
                where: {
                  id: PurchaseRequestId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in PurchaseRequestController trying to delete a PurchaseRequest \n\n", error);
            return { successful: false, error: error };
        }
    }
}
