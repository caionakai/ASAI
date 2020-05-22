const { Model , DataTypes } = require('sequelize');

class SalesData extends Model {
  static init(sequelize) {
    super.init({ details : DataTypes.STRING(100),}, {
      sequelize,
      tableName: 'SalesData'
    });
  }static associate(models) {
    this.hasMany(models.Sale, { foreignKey: 'id', as: 'sale' });
}
}
module.exports =  SalesData                                                                                     ;