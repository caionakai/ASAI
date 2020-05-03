const { Model , DataTypes } = require('sequelize');

class InterviewResut extends Model {
  static init(sequelize) {
    super.init({
      report : DataTypes.STRING,
      date: DataTypes.DATE,
      interview_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'InterviewResut'
    });
  }

  static associate(models) {
    this.hasMany(models.Interview, { foreignKey: 'id', as: 'interview' });
  }
}

module.exports =  InterviewResut;