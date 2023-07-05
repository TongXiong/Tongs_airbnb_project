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
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/330px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Blue_Sky%2C_Dhaka%2C_Bangladesh.jpg/330px-Blue_Sky%2C_Dhaka%2C_Bangladesh.jpg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/styles/fluid_1200/public/LACMA_1280x642.jpg?itok=1pk6T9ku.jpg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://image-tc.galaxy.tf/wijpeg-1eb80prhp0zb5iu1mekjw0ja0/googleplex-mountain-view-ca_standard.jpg?crop=69%2C0%2C1116%2C837",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/EA_Building_RedwoodShores.JPG/800px-EA_Building_RedwoodShores.JPG",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://cdn.theatlantic.com/thumbor/dQXWblrYsQ0uizslgKh30iKMspc=/438x0:1563x1125/540x540/media/img/2022/12/0123_DIS_Koren_Overview_1/original.jpg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://SurfCityUSA.simpleviewcrm.com/images/listings/original_1115965_10151784015310742_909981299_o0.jpg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://assetsio.reedpopcdn.com/the_legend_of_zelda_skyward_sword_3.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://www.anime-expo.org/wp-content/uploads/2019/04/anime_expo_2019_convention_los_angeles_lacc.jpg",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://cdnb.artstation.com/p/assets/images/images/049/767/513/large/0bject-narnia4-01.jpg?1653295004",
        preview: true,
      },
      {
        spotId: 11,
        url: "https://img1.cgtrader.com/items/3136273/294d9ea6f2/large/peach-castle-with-interior-3d-model-low-poly-rigged-obj-fbx-c4d-dae.jpg",
        preview: true,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
