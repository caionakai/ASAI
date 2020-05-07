const Supplier = require('../models/Supplier')

module.exports = {
    async getById(supplierId) {
        try {
            return { successful: true, res: await Supplier.findByPk(supplierId) };
        } catch (error) {
            console.error("\nError in supplierController trying to get a supplier by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async getAll() {
        try {
            return { successful: true, res: await Supplier.findAll() };
        } catch (error) {
            console.error("\nError in supplierController trying to get all suppliers \n\n", error);
            return { successful: false, error: error };
        }
    },

    async save(supplier) {
        try {
            return { successful: true, res: await Supplier.create(supplier) };
        } catch (error) {
            console.error("\nError in supplierController trying to create a supplier \n\n", error);
            return { successful: false, error: error };
        }
    },

    async update(supplierId, newSupplier){
        try {
            await Supplier.update(newSupplier, {
                where: {
                    id: supplierId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in supplierController trying to update a supplier by ID \n\n", error);
            return { successful: false, error: error };
        }
    },

    async delete(supplierId){
        try {
            await Supplier.destroy({
                where: {
                  id: supplierId
                }
            });

            return { successful: true };

        } catch (error) {
            console.error("\nError in supplierController trying to delete a supplier \n\n", error);
            return { successful: false, error: error };
        }
    }
}
