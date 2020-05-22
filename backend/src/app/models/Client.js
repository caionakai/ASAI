const { Model , DataTypes } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(255),
      address : DataTypes.STRING(255),
      phone : DataTypes.STRING(255),
      email : DataTypes.STRING(255),
      preferredComunicationMethod : DataTypes.STRING(255)
    }, {
      sequelize,
      tableName: 'Client'
    });
  }
}

module.exports =  Client;