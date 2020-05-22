const { Model , DataTypes } = require('sequelize');

class World extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING(50)
    }, {
      sequelize,
      tableName: 'Mundos'
    });
  }
}

module.exports =  World;