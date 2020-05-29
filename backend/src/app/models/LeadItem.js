const { Model , DataTypes } = require('sequelize');

class LeadItem extends Model {
  static init(sequelize) {
    super.init({
      lead: DataTypes.STRING(50),
      company: DataTypes.STRING(50),
      person: DataTypes.STRING(50),
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING(50),
      phone: DataTypes.INTEGER,
      description: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'LeadItem'
    });
  }
}

module.exports =  LeadItem;