import superNova from "../../images/supernova.jpg"

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
        url: superNova,
        preview: true,
      },
      {
        spotId: 2,
        url: "spoturl2",
        preview: false,
      },
      {
        spotId: 3,
        url: "spoturl3",
        preview: true,
      },
      {
        spotId: 4,
        url: "spoturl4",
        preview: false,
      },
      {
        spotId: 5,
        url: "spoturl5",
        preview: true,
      },
      {
        spotId: 6,
        url: "spoturl6",
        preview: false,
      },
      {
        spotId: 7,
        url: "spoturl7",
        preview: true,
      },
      {
        spotId: 8,
        url: "spoturl8",
        preview: false,
      },
      {
        spotId: 9,
        url: "spoturl9",
        preview: true,
      },
      {
        spotId: 10,
        url: "spoturl10",
        preview: false,
      },
      {
        spotId: 11,
        url: "spoturl11",
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
