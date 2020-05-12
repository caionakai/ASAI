const { Model , DataTypes } = require('sequelize');

class Page extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(200)
    }, {
      sequelize,
      tableName: 'Page'
    });
  }
}

module.exports =  Page;