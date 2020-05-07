const { Model , DataTypes } = require('sequelize');

class Employee extends Model {
  static init(sequelize) {
    super.init({
        name : DataTypes.STRING(255),
        address : DataTypes.STRING(255),
        phone : DataTypes.STRING(255),
        curriculum: DataTypes.STRING,
        nif: DataTypes.STRING(255),
        email: DataTypes.STRING(255),
        job_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Employee'
    });
  }

  static associate(models) {
    this.hasMany(models.Job, { foreignKey: 'id', as: 'job' });
  }
}

module.exports =  Employee;