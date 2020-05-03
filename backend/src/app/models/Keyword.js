const { Model , DataTypes } = require('sequelize');

class Keyword extends Model {
  static init(sequelize) {
    super.init({
      word : DataTypes.STRING(200)
    }, {
      sequelize,
      tableName: 'Keyword'
    });
  }
}

module.exports =  Keyword;