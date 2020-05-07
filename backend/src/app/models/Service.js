const { Model , DataTypes } = require('sequelize');

class Service extends Model {
  static init(sequelize) {
    super.init({
        designation : DataTypes.STRING(255),
        date : DataTypes.DATE,
        employee_id : DataTypes.INTEGER,
        serviceType_id : DataTypes.INTEGER,
        client_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Service'
    });
  }

  static associate(models) {
    this.hasMany(models.Employee, { foreignKey: 'id', as: 'employee' });
    this.hasMany(models.ServiceType, { foreignKey: 'id', as: 'serviceType' });
    this.hasMany(models.Client, { foreignKey: 'id', as: 'client' });
  }
}

module.exports =  Service;