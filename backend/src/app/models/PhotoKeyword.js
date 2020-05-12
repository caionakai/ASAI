const { Model , DataTypes } = require('sequelize');

class PhotoKeyword extends Model {
  static init(sequelize) {
    super.init({
      photo_id: DataTypes.INTEGER,
      keyword_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'PhotoKeyword'
    });
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'id', as: 'Photo' });
    this.hasMany(models.Keyword, { foreignKey: 'id', as: 'Keyword' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'Product' });
  }
}

module.exports =  PhotoKeyword;