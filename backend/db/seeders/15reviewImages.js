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
      },
      {
        reviewId: 6,
        url: "randomurl6",
      },
      {
        reviewId: 7,
        url: "randomurl7",
      },
      {
        reviewId: 8,
        url: "randomurl8",
      },
      {
        reviewId: 9,
        url: "randumurl9",
      },
      {
        reviewId: 10,
        url: "randomurl10",
      },
      {
        reviewId: 11,
        url: "randomurl11",
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
