'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: "Great!",
        stars: 4.5,
      },
      {
        spotId: 2,
        userId: 11,
        review: "bad!",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: "okayish!",
        stars: 3.5,
      },
      {
        spotId: 4,
        userId: 6,
        review: "IDK!",
        stars: 4.5,
      },
      {
        spotId: 5,
        userId: 4,
        review: "GRANDE",
        stars: 2,
      },
      {
        spotId: 6,
        userId: 1,
        review: "COOOPPA",
        stars: 1.3,
      },
      {
        spotId: 7,
        userId: 7,
        review: "soso",
        stars: 4.5,
      },
      {
        spotId: 8,
        userId: 3,
        review: "doodooo",
        stars: 1.5,
      },
      {
        spotId: 9,
        userId: 11,
        review: "BOOOO",
        stars: 2,
      },
      {
        spotId: 10,
        userId: 9,
        review: "MMMMMMMMMMM",
        stars: 4.5,
      },
      {
        spotId: 11,
        userId: 10,
        review: "BALAAHAA",
        stars: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
