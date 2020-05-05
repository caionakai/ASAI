const { Model , DataTypes } = require('sequelize');

class Photo extends Model {
  static init(sequelize) {
    super.init({
      likes : DataTypes.INTEGER,
      comments: DataTypes.STRING(500),
      product_id: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Photo'
    });
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'id', as: 'product' });
  }
}

module.exports =  Photo;