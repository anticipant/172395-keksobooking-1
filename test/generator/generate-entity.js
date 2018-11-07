'use strict';

const util = require(`../../src/util`);

const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const OFFER_CHECK_IN_OUT_VARIANTS = [`12:00`, `13:00`, `14:00`];

const DATES = [
  1540318609198,
  1540101609198,
  1541308109198,
  1510308619198,
  1140308601198,
  1540308609198
];

const OFFER_TITLES = [`Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`];

const OFFER_TYPES = [`flat`, `palace`, `house`, `bungalo`];

const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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

const generateEntity = () => {
  const locationX = util.getRandomInteger(Coordinate.MIN_X, Coordinate.MAX_X);
  const locationY = util.getRandomInteger(Coordinate.MIN_Y, Coordinate.MAX_Y);
  return {
    'author': {
      'avatar': `https://robohash.org/boom-${util.getRandomInteger(0, 100)}`,
    },
    'offer': {
      'title': OFFER_TITLES[util.getRandomInteger(0, OFFER_TITLES.length)],
      'address': `${locationX}, ${locationY}`,
      'price': util.getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'type': OFFER_TYPES[util.getRandomInteger(0, OFFER_TYPES.length)],
      'rooms': util.getRandomInteger(OfferRooms.MIN, OfferRooms.MAX),
      'guests': util.getRandomInteger(OfferGuests.MIN, OfferGuests.MAX),
      'checkin': OFFER_CHECK_IN_OUT_VARIANTS[util.getRandomInteger(0, OFFER_CHECK_IN_OUT_VARIANTS.length)],
      'checkout': OFFER_CHECK_IN_OUT_VARIANTS[util.getRandomInteger(0, OFFER_CHECK_IN_OUT_VARIANTS.length)],
      'features': util.getRandomArray(OFFER_FEATURES),
      'description': ``,
      'photos': util.shuffleArray(OFFER_PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
    'date': DATES[util.getRandomInteger(0, DATES.length)],
  };
};

module.exports = generateEntity;
