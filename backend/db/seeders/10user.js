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
        email: 'marioBros@Plumbing.co',
        username: 'mario64',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Luigi',
        lastName: 'Mario',
        email: 'luigiBros@Plumbing.Co',
        username: 'luigi64',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Bowser',
        lastName: 'Koopa',
        email: 'evilking@conquer.co',
        username: 'bowser64',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Peach',
        lastName: 'Toadstool',
        email: 'princess@mushroom.io',
        username: 'peach64',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Toad',
        lastName: 'mushroom',
        email: 'toad@mushroom.io',
        username: 'toad64',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Link',
        lastName: 'Hero',
        email: 'hero@hyrule.co',
        username: 'link64',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Zelda',
        lastName: 'princess',
        email: 'princess@hyrule.io',
        username: 'zelda64',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Ganon',
        lastName: 'Demise',
        email: 'villian@hyrule.co',
        username: 'ganon64',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Navi',
        lastName: 'Fairy',
        email: 'fairy@hyrule.co',
        username: 'navi64',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Donkey',
        lastName: 'Kong',
        email: 'donkeykong@banana.co',
        username: 'kong64',
        hashedPassword: bcrypt.hashSync('password10')
      },
      {
        firstName: 'Diddy',
        lastName: 'Kong',
        email: 'diddykong@banana.co',
        username: 'diddy64',
        hashedPassword: bcrypt.hashSync('password11')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
