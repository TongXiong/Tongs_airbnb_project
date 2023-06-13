'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "randomurl1",
      },
      {
        reviewId: 2,
        url: "randomurl2",
      },
      {
        reviewId: 3,
        url: "randomurl3",
      },
      {
        reviewId: 4,
        url: "randumurl4",
      },
      {
        reviewId: 5,
        url: "randomurl5",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
