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
    this.hasMany(models.Brand, { foreignKey: 'id', as: 'Brand' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'Product' });
    this.hasMany(models.Store, { foreignKey: 'id', as: 'Store' });
    this.hasMany(models.ProductCategory, { foreignKey: 'id', as: 'ProductCategory' });
  }
}

module.exports =  Stock;