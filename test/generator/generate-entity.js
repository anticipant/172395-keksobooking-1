'use strict';

const util = require(`../../src/util`);

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
  const locationX = util.getRandomInt(Coordinate.MIN_X, Coordinate.MAX_X);
  const locationY = util.getRandomInt(Coordinate.MIN_Y, Coordinate.MAX_Y);
  return {
    'author': {
      'avatar': `https://robohash.org/boom-${util.getRandomInt(0, 100)}`,
    },
    'offer': {
      'title': offerTitles[util.getRandomInt(0, offerTitles.length)],
      'address': `${locationX}, ${locationY}`,
      'price': util.getRandomInt(OfferPrice.MIN, OfferPrice.MAX),
      'type': offerType[util.getRandomInt(0, offerType.length)],
      'rooms': util.getRandomInt(OfferRooms.MIN, OfferRooms.MAX),
      'guests': util.getRandomInt(OfferGuests.MIN, OfferGuests.MAX),
      'checkin': offerCheckInOut[util.getRandomInt(0, offerCheckInOut.length)],
      'checkout': offerCheckInOut[util.getRandomInt(0, offerCheckInOut.length)],
      'features': util.getRandomArray(offerFeatures),
      'description': ``,
      'photos': util.shuffleArray(offerPhotos),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
    'date': dates[util.getRandomInt(0, dates.length)],
  };
};

module.exports = generateEntity;
