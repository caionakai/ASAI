const { Model , DataTypes } = require('sequelize');

class Loyalty extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(255),
      description : DataTypes.STRING(255)
    }, {
      sequelize,
      tableName: 'Loyalty'
    });
  }
}

module.exports =  Loyalty;