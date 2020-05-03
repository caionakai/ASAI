const { Model , DataTypes } = require('sequelize');

class EmailMarketing extends Model {
  static init(sequelize) {
    super.init({
      receiver : DataTypes.STRING(50),
      mail_date: DataTypes.DATE
    }, {
      sequelize,
      tableName: 'EmailMarketing'
    });
  }
}

module.exports =  EmailMarketing;