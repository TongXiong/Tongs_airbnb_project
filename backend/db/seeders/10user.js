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
        firstName: 'DemoFirstName1',
        lastName: 'DemoLastName1',
        email: 'demo1@user.io',
        username: 'demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'DemoFirstName2',
        lastName: 'DemoLastName2',
        email: 'user2@user.io',
        username: 'demo-lition1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'DemoFirstName3',
        lastName: 'DemoLastName3',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'DemoFirstName4',
        lastName: 'DemoLastName4',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'DemoFirstName5',
        lastName: 'DemoLastName5',
        email: 'user5@user.io',
        username: 'FakeUser5',
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
