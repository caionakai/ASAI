const { Model , DataTypes } = require('sequelize');

class ServiceType extends Model {
  static init(sequelize) {
    super.init({
      designation : DataTypes.STRING(255)
    }, {
      sequelize,
      tableName: 'ServiceType'
    });
  }
}

module.exports =  ServiceType;