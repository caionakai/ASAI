const { Model , DataTypes } = require('sequelize');

class PurchaseRequest extends Model {
  static init(sequelize) {
    super.init({
      items_count : DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'PurchaseRequest'
    });
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'id', as: 'product' });
    this.hasMany(models.Supplier, { foreignKey: 'id', as: 'supplier' });
  }
}

module.exports =  PurchaseRequest;