const { Model , DataTypes } = require('sequelize');

class Store extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(200)
    }, {
      sequelize,
      tableName: 'Store'
    });
  }
}

module.exports =  Store;