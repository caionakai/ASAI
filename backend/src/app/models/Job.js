const { Model , DataTypes } = require('sequelize');

class Job extends Model {
  static init(sequelize) {
    super.init({
        beginOfContract : DataTypes.DATE,
        endOfContract : DataTypes.DATE,
        jobType_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Job'
    });
  }

  static associate(models) {
    this.hasMany(models.JobType, { foreignKey: 'id', as: 'jobType' });
  }
}

module.exports =  Job;