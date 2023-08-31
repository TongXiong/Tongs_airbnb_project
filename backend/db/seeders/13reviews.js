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
        review: "I recently had the chance to go camping on the Moon and it was an amazing experience",
        stars: 4.5,
      },
      {
        spotId: 1,
        userId: 9,
        review: "I recently went on a camping trip and had the opportunity to stay up late and marvel at the beauty of the night sky",
      },
      {
        spotId: 2,
        userId: 11,
        review: "Staying in Heaven is an amazing experience. It's a place of peace and harmony, where everyone gets along and works together in harmony".
        stars: 5,
      },
      {
        spotId: 2,
        userId: 1,
        review: "I recently had the pleasure of camping in Heaven",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: "On a non-school day, my granddaughter and I visited the Natural History Museum of Los Angeles County."
        stars: 3.5,
      },
      {
        spotId: 3,
        userId: 4,
        review: "I've been to many natural history museums and this one is not bad at all",
        stars: 3.5,
      },
      {
        spotId: 4,
        userId: 6,
        review: "We were visiting San Francisco and we decided to drive down to San Jose to visit Silicon Valley",
        stars: 4.5,
      },
      {
        spotId: 4,
        userId: 10,
        review: "We love this quiet place full of world top tech companies",
      },
      {
        spotId: 5,
        userId: 4,
        review: "the breakfast buffet was absolutely delicious and the staff provided great service throughout.",
        stars: 4,
      },
      {
        spotId: 5,
        userId: 7,
        review: "The hotel is situated in a great location, just steps away from some of the best attractions in the city, making it super easy to explore",
        stars: 3,
      },
      {
        spotId: 6,
        userId: 1,
        review: "I recently had the pleasure of spending a night in Space, and it was an unforgettable experience.",
        stars: 5,
      },
      {
        spotId: 6,
        userId: 5,
        review: "space exploration also comes with the danger of microgravity",
        stars: 1.3,
      },
      {
        spotId: 7,
        userId: 2,
        review: "Disneyland is one of the funnest places I’ve taken my family to.",
        stars: 4.5,
      },
      {
        spotId: 7,
        userId: 7,
        review: "We spend a whole day in the park, very tiring but we had a fantastic day.",
        stars: 3.5,
      },
      {
        spotId: 8,
        userId: 6,
        review: "The campgrounds were well-maintained and the staff was friendly and helpful.",
        stars: 5,
      },
      {
        spotId: 8,
        userId: 8,
        review: " I was able to explore the surrounding area and take in the stunning views.",
        stars: 3,
      },
      {
        spotId: 9,
        userId: 4,
        review: "Overall Anime Expo is a very impressive event that manages to offer experiences that you can’t find anywhere else.",
        stars: 3,
      },
      {
        spotId: 9,
        userId: 11,
        review: "This was one of the most dangerous examples of zero crowd control I've ever experienced. I went with two children.",
        stars: 2,
      },
      {
        spotId: 10,
        userId: 3,
        review: "I recently had the pleasure of staying in Narnhia for a long weekend, and I was pleasantly surprised by the experience.",
        stars: 4.5,
      },
      {
        spotId: 10,
        userId: 9,
        review: "If you’re looking for an unforgettable and enchanting adventure, look no further than a stay in Middle Earth!",
        stars: 4.5,
      },
      {
        spotId: 11,
        userId: 1,
        review: "The Mushroom Kingdom from Super Mario Bros is an absolutely incredible place to stay!",
        stars: 3,
      },
      {
        spotId: 11,
        userId: 7,
        review: "The power-ups are plentiful and every character has unique abilities.",
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
