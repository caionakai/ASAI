const { Model , DataTypes } = require('sequelize');

class Marketing extends Model {
  static init(sequelize) {
    super.init({
      client_id : DataTypes.INTEGER,
      loyalty_id : DataTypes.INTEGER,
      offer_id : DataTypes.INTEGER,
      sale_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Marketing'
    });
  }

  static associate(models) {
    this.hasMany(models.Client, { foreignKey: 'id', as: 'client' });
    this.hasMany(models.Loyalty, { foreignKey: 'id', as: 'loyalty' });
    this.hasMany(models.SpecialOffer, { foreignKey: 'id', as: 'specialOffer' });
    this.hasMany(models.Sale, { foreignKey: 'id', as: 'sale' });
  }
}

module.exports =  Marketing;