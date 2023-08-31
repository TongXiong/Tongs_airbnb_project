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
        review: "I recently had the chance to go camping on the Moon and it was an amazing experience! The landscape was breathtaking – the craters and mountains were so unique and the stars were brighter than ever. The temperature was surprisingly warm, even during the night, and the lack of air made it easier to hike and explore. We set up our campsite at a nearby crater and were able to take in the beauty of the night sky. The lack of gravity was also a neat experience – we were able to jump much higher than we would on Earth! Overall, it was an unforgettable experience and I highly recommend camping on the Moon to anyone looking for a unique adventure.",
        stars: 4.5,
      },
      {
        spotId: 1,
        userId: 9,
        review: "I recently went on a camping trip and had the opportunity to stay up late and marvel at the beauty of the night sky. I was particularly amazed at the stunning sight of Earth. It was day time and it illuminated the night sky with a eerie glow, making the space look like a beautiful blue aura. The Moon was so big and cold that it seemed like I could be healthier and live on it. I was mesmerized by its beauty and was in awe of its grandeur. I could not help but think about how small and insignificant I was in the grand scheme of things. I felt a peace of mind and a connection with the universe that night and I will never forget it. The Moon is truly a magical and awe inspiring destination.",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 11,
        review: "Staying in Heaven is an amazing experience. It's a place of peace and harmony, where everyone gets along and works together in harmony. The environment is beautiful and the people are friendly and welcoming. The air is clean and refreshing and the skies are always blue. There are no worries or stress and all of the days are perfect. Everyone is free to do whatever they want and the days are filled with joy and laughter. Life is just perfect in Heaven. There are no worries or stress and everyone is happy and content. The food is delicious and the weather is always perfect. Heaven truly is a place of peace and joy. I highly recommend visiting Heaven!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 1,
        review: "I recently had the pleasure of camping in Heaven, and I can honestly say that it was the best camping experience of my life. The campsite was located in a beautiful, remote area in the middle of the mountains. The scenery was breathtaking, with lush green trees and a tranquil lake nearby. The campsite was well-maintained, with plenty of amenities and activities to keep us busy. We had access to a wide variety of hiking trails, fishing spots, and swimming areas. The nights were filled with starry skies and the sound of nature all around us. The staff were friendly and helpful in every way, making sure that our stay was comfortable and enjoyable. All in all, I would highly recommend camping in Heaven for anyone looking for a peaceful and beautiful getaway.",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: "On a non-school day, my granddaughter and I visited the Natural History Museum of Los Angeles County. Tickets must first be purchased online, selecting day and time of planned visit. Face masks must be worn at all times, except when eating. We also reserved tickets for the 'Becoming Jane' exhibit on Jane Goodall. We both enjoyed the exhibit, which included a tent simulating what Jane lived in when she was in Africa. My granddaughter really enjoyed mimicking the chimpanzee's sounds alerting that a snake is nearby. There is a small restaurant to get a snack or lunch and plenty of indoor and covered outdoor seating. The gift shop offers a variety of souvenirs, toys, gifts.",
        stars: 3.5,
      },
      {
        spotId: 3,
        userId: 4,
        review: "I've been to many natural history museums and this one is not bad at all. Of course the dinosaur fossils are the 'stars' here but the exhibition about the history of LA was also quite interesting. There was a long line at the door so it's a good idea to have some kind of advance ticket before you go.",
        stars: 3.5,
      },
      {
        spotId: 4,
        userId: 6,
        review: "We were visiting San Francisco and we decided to drive down to San Jose to visit Silicon Valley. We didn't join any tour for this, we went by ourselves. There are many well-known companies around this place. We only visited Facebook, Google, and Apple. We went during weekend. However, we weren't allowed to go into any company. You are only allowed to take pictures on their logos. But I would probably say this place is good to go if you have not been there before. I probably will not go for the second time.",
        stars: 4.5,
      },
      {
        spotId: 4,
        userId: 10,
        review: "We love this quiet place full of world top tech companies. There they use lots of electric cars and bikes, environmental friendly. We walked around google buildings and visited visitor center. It was closed but was interesting to see.",
        stars: 4.5,
      },
      {
        spotId: 5,
        userId: 4,
        review: "the breakfast buffet was absolutely delicious and the staff provided great service throughout. All in all, I had an amazing time staying at Electronic Arts, and will definitely come back next time I'm in town.",
        stars: 4,
      },
      {
        spotId: 5,
        userId: 7,
        review: "The hotel is situated in a great location, just steps away from some of the best attractions in the city, making it super easy to explore. The room was perfectly appointed, with all the amenities I could have wanted, plus one extra surprise - a free airport pick up!",
        stars: 3,
      },
      {
        spotId: 6,
        userId: 1,
        review: "I recently had the pleasure of spending a night in Space, and it was an unforgettable experience. The views were breathtaking, and the stars were brighter than I had ever seen them before. I was able to see the Milky Way, and the planets in our solar system in a way that I had never seen before. It was truly an amazing experience. The silence and stillness of space was also quite calming and peaceful. I felt a sense of awe and wonder that I had never felt before. I would highly recommend a night in space to anyone looking for a truly unique and unforgettable experience.",
        stars: 5,
      },
      {
        spotId: 6,
        userId: 5,
        review: "space exploration also comes with the danger of microgravity. This is the lack of gravity that astronauts experience in space, and it can cause a number of health issues. These issues range from muscle and bone loss to dizziness and nausea. To combat these issues, astronauts must exercise regularly and take medication to help with the effects of microgravity.",
        stars: 1.3,
      },
      {
        spotId: 7,
        userId: 2,
        review: "Disneyland is one of the funnest places I’ve taken my family to. The amount of thought that goes into every last detail there is amazing. Staff are all very friendly, happy and helpful. It definitely gets busy, so arriving early is a good idea. Security lineups moved very quickly, which is nice having bags ready for inspection helps speed up the process too.",
        stars: 4.5,
      },
      {
        spotId: 7,
        userId: 7,
        review: "We spend a whole day in the park, very tiring but we had a fantastic day. We got on loads of rides in the morning including Thunder mountain, Haunted mansion, Rise of resistance, Smugglers run, Splash mountain by 9.30. We had Genie+ but did not use it until late morning then throughout the rest of the day, this allowed us to go on the rides again when the queue was long.",
        stars: 3.5,
      },
      {
        spotId: 8,
        userId: 6,
        review: "The campgrounds were well-maintained and the staff was friendly and helpful. The campsite had plenty of room for tents, hammocks, and fire pits. We were able to explore the area and take in the beautiful views. The night sky was spectacular and I was able to watch the stars from the comfort of my tent. I also enjoyed the activities and games that were available for us to participate in. Overall, camping in Skyloft was a great experience and I highly recommend it to anyone looking for a unique outdoor adventure.",
        stars: 5,
      },
      {
        spotId: 8,
        userId: 8,
        review: " I was able to explore the surrounding area and take in the stunning views. I also enjoyed the fishing, cooking, and other activities available. Overall, I had an amazing time camping in Skyloft and would highly recommend it to anyone looking for a unique and enjoyable camping experience.",
        stars: 3,
      },
      {
        spotId: 9,
        userId: 4,
        review: "Overall Anime Expo is a very impressive event that manages to offer experiences that you can’t find anywhere else. However, the crowd is so large that a lot of these experiences are just hard to do to the point that I decided to avoid some of them entirely",
        stars: 3,
      },
      {
        spotId: 9,
        userId: 11,
        review: "This was one of the most dangerous examples of zero crowd control I've ever experienced. I went with two children. There were tens of thousands of people attempting to enter and NO STAFF TO ASSIST WITH LINES.",
        stars: 2,
      },
      {
        spotId: 10,
        userId: 3,
        review: "I recently had the pleasure of staying in Narnhia for a long weekend, and I was pleasantly surprised by the experience. The city itself is full of charm, with its vibrant culture, stunning architecture, and friendly people.",
        stars: 4.5,
      },
      {
        spotId: 10,
        userId: 9,
        review: "If you’re looking for an unforgettable and enchanting adventure, look no further than a stay in Middle Earth! This mystical land is full of extraordinary places and creatures, and staying here will give you a chance to experience them all first hand. From the rolling hills of the Shire to the majestic mountains of Rivendell, you can explore and discover all the wonders of Middle Earth while enjoying a relaxing and peaceful stay.",
        stars: 4.5,
      },
      {
        spotId: 11,
        userId: 1,
        review: "The Mushroom Kingdom from Super Mario Bros is an absolutely incredible place to stay! It's always bustling with fun activities and diverse real-world elements and characters. Every corner is filled with bright colors, friendly people, unique treasures, and vibrant foliage. It's the perfect escape from reality. The mystery and whimsy of the kingdom make it hard to leave.",
        stars: 3,
      },
      {
        spotId: 11,
        userId: 7,
        review: "The power-ups are plentiful and every character has unique abilities. This not only keeps the game fresh but also allows for a lot of creativity as to how each level can be approached. The cool items like the invincibility star and the Tanooki Suit are some of the best tools to help you navigate the kingdom.",
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
