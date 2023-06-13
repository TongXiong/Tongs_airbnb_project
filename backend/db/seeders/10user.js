'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Mario',
        lastName: 'Mario',
        email: 'marioBros@Plumbing.Co',
        username: 'mario64',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Luigi',
        lastName: 'Mario',
        email: 'luigiBros@Plumbing.Co',
        username: 'Luigi64',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Bowser',
        lastName: 'Koopa',
        email: 'evilking@conquer.co',
        username: 'Bowser64',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Peach',
        lastName: 'Toadstool',
        email: 'princess4@mushroom.io',
        username: 'Peach64',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Toad',
        lastName: 'mushroom',
        email: 'toad@mushroom.io',
        username: 'Toad64',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
