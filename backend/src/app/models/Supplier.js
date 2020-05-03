const { Model , DataTypes } = require('sequelize');

class Supplier extends Model {
  static init(sequelize) {
    super.init({
      address : DataTypes.STRING(100),
      name : DataTypes.STRING(50),
      email : DataTypes.STRING(100)
    }, {
      sequelize,
      tableName: 'Supplier'
    });
  }
}

module.exports =  Supplier;