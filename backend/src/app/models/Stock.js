const { Model , DataTypes } = require('sequelize');

class Stock extends Model {
  static init(sequelize) {
    super.init({
      store_id : DataTypes.INTEGER,
      product_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Stock'
    });
  }

  static associate(models) {
    this.hasMany(models.Store, { foreignKey: 'id', as: 'store' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'product' });
  }
}

module.exports =  Stock;