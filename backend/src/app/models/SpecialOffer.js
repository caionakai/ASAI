const { Model , DataTypes } = require('sequelize');

class SpecialOffer extends Model {
  static init(sequelize) {
    super.init({
      details : DataTypes.STRING(255)
    }, {
      sequelize,
      tableName: 'SpecialOffer'
    });
  }
}

module.exports =  SpecialOffer;