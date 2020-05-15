const { Model , DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name : DataTypes.STRING(255),
      quantity: DataTypes.INTEGER,
      price : DataTypes.DECIMAL(5,2),
      quantity : DataTypes.INTEGER,
      brand_id : DataTypes.INTEGER,
      category_id : DataTypes.INTEGER,
      supplier_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Product'
    });
  }

  static associate(models) {
    this.hasMany(models.Brand, { foreignKey: 'id', as: 'Brand' });
    this.hasMany(models.ProductCategory, { foreignKey: 'id', as: 'ProductCategory' });
    this.hasMany(models.Supplier, { foreignKey: 'id', as: 'Supplier' });
    //this.hasMany(models.Stock, { foreignKey: 'id', as: 'Stock' });
  }
}

module.exports =  Product;