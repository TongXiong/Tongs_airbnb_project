'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
      },
      {
        spotId: 2,
        userId: 2,
      },
      {
        spotId: 3,
        userId: 3,
      },
      {
        spotId: 4,
        userId: 4,
      },
      {
        spotId: 5,
        userId: 5,
      },
      {
        spotId: 6,
        userId: 6,
      },
      {
        spotId: 7,
        userId: 7,
      },
      {
        spotId: 8,
        userId: 8,
      },
      {
        spotId: 9,
        userId: 9,
      },
      {
        spotId: 10,
        userId: 10,
      },
      {
        spotId: 11,
        userId: 11,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
