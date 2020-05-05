const { Model , DataTypes } = require('sequelize');

class Interview extends Model {
  static init(sequelize) {
    super.init({
      date : DataTypes.DATE,
      beginTime: DataTypes.TIME,
      candidate_id : DataTypes.INTEGER,
      employee_id : DataTypes.INTEGER,
      isDone: DataTypes.INTEGER      
    }, {
      sequelize,
      tableName: 'Interview'
    });
  }

  static associate(models) {
    this.hasMany(models.Candidate, { foreignKey: 'id', as: 'candidate' });
    this.hasMany(models.Employee, { foreignKey: 'id', as: 'employee' });
  }
}

module.exports =  Interview;
