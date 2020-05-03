const { Model , DataTypes } = require('sequelize');

class Feedback extends Model {
  static init(sequelize) {
    super.init({
        date : DataTypes.DATE,
        evaluation: DataTypes.INTEGER,
        description: DataTypes.STRING(255),
        service_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Feedback'
    });
  }

  static associate(models) {
    this.hasMany(models.Service, { foreignKey: 'id', as: 'service' });
  }
}

module.exports =  Feedback;