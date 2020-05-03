const { Model , DataTypes } = require('sequelize');

class Brand extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(200)
    }, {
      sequelize,
      tableName: 'Brand'
    });
  }
}

module.exports =  Brand;