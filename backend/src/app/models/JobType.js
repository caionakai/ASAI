const { Model , DataTypes } = require('sequelize');

class JobType extends Model {
  static init(sequelize) {
    super.init({
      designation : DataTypes.STRING(255)
    }, {
      sequelize,
      tableName: 'JobType'
    });
  }
}

module.exports =  JobType;