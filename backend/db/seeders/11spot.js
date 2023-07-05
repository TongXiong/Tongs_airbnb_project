'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "Elm street",
        city: "Moon",
        state: "California",
        country: "United States of America",
        lat: 22.11111111,
        lng: -22.11111111,
        name: "FireNation",
        description: "The only nation of rocks",
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
      },
      {
        ownerId: 6,
        address: "Space",
        city: "Dust",
        state: "suns",
        country: "Universe",
        lat: 99.999999999,
        lng: -999.999999999,
        name: "outer Space",
        description: "Completely Silent",
        price: 99.92,
      },
      {
        ownerId: 7,
        address: "1313 Disneyland Drive",
        city: "Anaheim",
        state: "California",
        country: "United States of America",
        lat: 33.81126200060813,
        lng: -117.92201828693275,
        name: "DisneyLand",
        description: "featuring characters, rides, and shows based on the creations of Walt Disney and the Disney Company",
        price: 39.99,
      },
      {
        ownerId: 8,
        address: "Sky ",
        city: "Skyloft",
        state: "Skyloft",
        country: "hyrule",
        lat: 501.536070161413974,
        lng: -302.25777203339068,
        name: "Skyloft",
        description: "The first Hero resides here",
        price: 83.42,
      },
      {
        ownerId: 9,
        address: "1201 S Figueroa St",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.040471816999535,
        lng: -118.2695624024255,
        name: "Los Angeles Convention Center",
        description: "High-tech facility featuring glass pavilions, an art-filled lobby & extensive exhibit hall space.",
        price: 49.99,
      },
      {
        ownerId: 10,
        address: "kings palace",
        city: "Narnia",
        state: "Narnia",
        country: "middle-earth",
        lat: 224.5376553421,
        lng: -100.542765339068,
        name: "The Duo",
        description: "Movies of books",
        price: 24.99,
      },
      {
        ownerId: 11,
        address: "Green Pipe",
        city: "Toad Town",
        state: "Princess Castle",
        country: "Mushroom Kingdom",
        lat: 37.536070161413974,
        lng: -122.25777203339068,
        name: "The Mushroom Kingdom",
        description: "Mario saves the Mushroom Kingdom from Bowser",
        price: 36.84,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
