'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "spoturl1",
        preview: false,
      },
      {
        spotId: 2,
        url: "spoturl2",
        preview: false,
      },
      {
        spotId: 3,
        url: "spoturl3",
        preview: false,
      },
      {
        spotId: 4,
        url: "spoturl4",
        preview: false,
      },
      {
        spotId: 5,
        url: "spoturl5",
        preview: false,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};