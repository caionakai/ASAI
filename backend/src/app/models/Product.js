const { Model , DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(255),
      quantity: DataTypes.INTEGER,
      price : DataTypes.DECIMAL(5,2),
      brand_id : DataTypes.INTEGER,
      category_id : DataTypes.INTEGER,
      supplier_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Product'
    });
  }

  static associate(models) {
    this.hasMany(models.Brand, { foreignKey: 'id', as: 'brand' });
    this.hasMany(models.ProductCategory, { foreignKey: 'id', as: 'category' });
    this.hasMany(models.Supplier, { foreignKey: 'id', as: 'supplier' });
  }
}

module.exports =  Product;