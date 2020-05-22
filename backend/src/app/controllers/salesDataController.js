const SalesData = require("../models/SalesData");

module.exports = {
  async getById(SalesDataId) {
    try {
      return { successful: true, res: await SalesData.findByPk(SalesDataId) };
    } catch (error) {
      console.error(
        "\nError in SalesDataController trying to get a SalesData by ID \n\n",
        error
      );
      return { successful: false, error: error };
    }
  },

  async getAll() {
    try {
      return { successful: true, res: await SalesData.findAll() };
    } catch (error) {
      console.error(
        "\nError in SalesDataController trying to get all SalesData \n\n",
        error
      );
      return { successful: false, error: error };
    }
  },

  async save(SalesData) {
    try {
      return { successful: true, res: await SalesData.create(SalesData) };
    } catch (error) {
      console.error(
        "\nError in SalesDataController trying to create a SalesData \n\n",
        error
      );
      return { successful: false, error: error };
    }
  },

  async update(SalesDataId, newSalesData) {
    try {
      await SalesData.update(newSalesData, {
        where: {
          id: SalesDataId,
        },
      });

      return { successful: true };
    } catch (error) {
      console.error(
        "\nError in SalesDataController trying to update a SalesData by ID \n\n",
        error
      );
      return { successful: false, error: error };
    }
  },

  async delete(SalesDataId) {
    try {
      await SalesData.destroy({
        where: {
          id: SalesDataId,
        },
      });

      return { successful: true };
    } catch (error) {
      console.error(
        "\nError in SalesDataController trying to delete a SalesData \n\n",
        error
      );
      return { successful: false, error: error };
    }
  },
};
