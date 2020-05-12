const { Model , DataTypes } = require('sequelize');

class Photo extends Model {
  static init(sequelize) {
    super.init({
      likes : DataTypes.INTEGER,
      comments: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      page_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Photo'
    });
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'id', as: 'Product' });
    this.hasMany(models.Page, { foreignKey: 'id', as: 'Page' });
  }
}

module.exports =  Photo;