'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User, {
          as: 'Owner',
          foreignKey: "ownerId",
          // onDelete: "CASCADE",
          hooks: true
        }
      )
      Spot.belongsToMany(
        models.User, {
          through: models.Booking,
          foreignKey: "spotId",
          otherKey: "userId"
        }
      )
      Spot.belongsToMany(
        models.User, {
          through: models.Review,
          foreignKey: "spotId",
          otherKey: "userId"
        }
      )
      Spot.hasMany(
        models.SpotImage, {
          foreignKey: "spotId"
        }
      )
      Spot.hasMany(
        models.Review, {
          foreignKey: "spotId"
        }
      )
      Spot.hasMany(
        models.Booking, {
          foreignKey: "spotId"
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
