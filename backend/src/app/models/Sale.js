const { Model , DataTypes } = require('sequelize');

class Sale extends Model {
  static init(sequelize) {
    super.init({
      purchase_date : DataTypes.DATE,
      discount_percentage : DataTypes.INTEGER,
      client_id : DataTypes.INTEGER,
      seller_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Sale'
    });
  }

  static associate(models) {
    this.hasMany(models.Client, { foreignKey: 'id', as: 'client' });
    this.hasMany(models.Employee, { foreignKey: 'id', as: 'seller' });
  }
}

module.exports =  Sale;