'use strict';

const utilit = require(`./utilit`);

const OfferPrice = {
  MIN: 1000,
  MAX: 1000000,
};
const Coordinate = {
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 150,
  MAX_Y: 500,
};
const OfferRooms = {
  MIN: 1,
  MAX: 5,
};
const OfferGuests = {
  MIN: 1,
  MAX: 100,
};


const dates = [
  1540318609198,
  1540101609198,
  1541308109198,
  1510308619198,
  1140308601198,
  1540308609198,
  1540308609118,
  1540308609191
];
const offerCheckInOut = [`12:00`, `13:00`, `14:00`];
const offerTitles = [`Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`];
const offerType = [`flat`, `palace`, `house`, `bungalo`];
const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const generateEntity = () => {
  const locationX = utilit.getRandomInt(Coordinate.MIN_X, Coordinate.MAX_X);
  const locationY = utilit.getRandomInt(Coordinate.MIN_Y, Coordinate.MAX_Y);
  return {
    'author': {
      'avatar': `https://robohash.org/boom-${utilit.getRandomInt(0, 100)}`,
    },
    'offer': {
      'title': offerTitles[utilit.getRandomInt(0, offerTitles.length)],
      'address': `${locationX}, ${locationY}`,
      'price': utilit.getRandomInt(OfferPrice.MIN, OfferPrice.MAX),
      'type': offerType[utilit.getRandomInt(0, offerType.length)],
      'rooms': utilit.getRandomInt(OfferRooms.MIN, OfferRooms.MAX),
      'guests': utilit.getRandomInt(OfferGuests.MIN, OfferGuests.MAX),
      'checkin': offerCheckInOut[utilit.getRandomInt(0, offerCheckInOut.length)],
      'checkout': offerCheckInOut[utilit.getRandomInt(0, offerCheckInOut.length)],
      'features': utilit.getRandomArray(offerFeatures),
      'description': ``,
      'photos': utilit.shuffleArray(offerPhotos),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
    'date': dates[utilit.getRandomInt(0, dates.length)],
  };
};

module.exports = generateEntity;
