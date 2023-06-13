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
        userId: 1,
        review: "a review1",
        stars: 4.5,
      },
      {
        spotId: 2,
        userId: 2,
        review: "a review2",
        stars: 0.5,
      },
      {
        spotId: 3,
        userId: 3,
        review: "a review3",
        stars: 3.5,
      },
      {
        spotId: 4,
        userId: 4,
        review: "a review4",
        stars: 2.5,
      },
      {
        spotId: 5,
        userId: 5,
        review: "a review5",
        stars: 5,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
