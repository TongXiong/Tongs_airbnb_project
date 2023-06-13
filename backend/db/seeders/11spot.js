'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot } = require("../models")

const spots = [
  {
    ownerId: 1,
    address: "Elm street",
    city: "Supernova",
    state: "California",
    country: "United States of America",
    lat: 22.11111111,
    lng: -22.11111111,
    name: "FireNation",
    description: "The only nation of Fire",
    price: 12.51,
  },
  {
    ownerId: 2,
    address: "Sky",
    city: "City of Angels",
    state: "Earth",
    country: "Heaven",
    lat: 11.11111111,
    lng: -11.11111111,
    name: "Heaven",
    description: "Where the Angels live",
    price: 12.92,
  },
  {
    ownerId: 3,
    address: "900 Exposition Blvd",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 34.01731374388274,
    lng: -118.28870641776649,
    name: "Natural History Museum of Los Angeles County",
    description: "Where history lives",
    price: 29.17,
  },
  {
    ownerId: 4,
    address: "1600 Amphitheatre Pkwy",
    city: "San Jose",
    state: "California",
    country: "United States of America",
    lat: 37.43542197787858,
    lng: -122.08746104144335,
    name: "Google",
    description: "Google plex campus",
    price: 13.23,
  },
  {
    ownerId: 5,
    address: "209 Redwood Shores Pkwy",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.536070161413974,
    lng: -122.25777203339068,
    name: "Electronic Arts",
    description: "Games are built here",
    price: 36.84,
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Spot.bulkCreate(spots, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("spots")
  }
};
