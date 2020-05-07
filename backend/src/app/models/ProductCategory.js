const { Model , DataTypes } = require('sequelize');

class ProductCategory extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(200)
    }, {
      sequelize,
      tableName: 'ProductCategory'
    });
  }
}

module.exports =  ProductCategory;