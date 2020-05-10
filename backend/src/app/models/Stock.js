const { Model , DataTypes } = require('sequelize');

class Stock extends Model {
  static init(sequelize) {
    super.init({
      store_id : DataTypes.INTEGER,
      product_id : DataTypes.INTEGER,
      quantity : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Stock'
    });
  }

  static associate(models) {
    this.hasMany(models.Store, { foreignKey: 'id', as: 'Store' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'Product' });
  }
}

module.exports =  Stock;