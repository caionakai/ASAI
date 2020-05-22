const { Model , DataTypes } = require('sequelize');

class EmailProduct extends Model {
  static init(sequelize) {
    super.init({
      product_id: DataTypes.INTEGER,
      email_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'EmailProduct'
    });
  }

  static associate(models) {
    this.hasMany(models.EmailMarketing, { foreignKey: 'id', as: 'marketingProduct' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'emailProduct' });
  }
}

module.exports =  EmailProduct;