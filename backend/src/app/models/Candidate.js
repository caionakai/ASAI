const { Model , DataTypes } = require('sequelize');

class Candidate extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(255),
      address : DataTypes.STRING(255),
      phone : DataTypes.STRING(255),
      addedOn: DataTypes.DATE,
      curriculum: DataTypes.STRING,
      nif: DataTypes.STRING(255),
      email: DataTypes.STRING(255),
    }, {
      sequelize,
      tableName: 'Candidate'
    });
  }
}

module.exports =  Candidate;