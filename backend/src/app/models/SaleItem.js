const { Model , DataTypes } = require('sequelize');

class SaleItem extends Model {
  static init(sequelize) {
    super.init({
      quantity : DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      sale_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'SaleItem'
    });
  }

  static associate(models) {
    this.hasMany(models.Sale, { foreignKey: 'id', as: 'sale' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'product' });
  }
}

module.exports =  SaleItem;