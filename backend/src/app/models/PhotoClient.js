const { Model , DataTypes } = require('sequelize');

class PhotoClient extends Model {
  static init(sequelize) {
    super.init({
      photo_id : DataTypes.INTEGER,
      client_id : DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'PhotoClient'
    });
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'id', as: 'photo' });
    this.hasMany(models.Client, { foreignKey: 'id', as: 'client' });
  }
}

module.exports =  PhotoClient;