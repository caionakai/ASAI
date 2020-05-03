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
    this.hasMany(models.Photo, { foreignKey: 'id', as: 'photo' });
    this.hasMany(models.Keyword, { foreignKey: 'id', as: 'keyword' });
  }
}

module.exports =  PhotoKeyword;