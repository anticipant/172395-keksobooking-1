'use strict';

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

const shuffleArray = (array) => {
  const arrayLength = array.length;
  let initialArray = array.slice();
  let shuffledArray = [];

  for (let i = 0; i < arrayLength; i++) {
    let position = getRandomInt(0, initialArray.length);
    shuffledArray.push(initialArray.splice(position, 1)[0]);
  }

  return shuffledArray;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArray = (array) => {
  const randomNumber = getRandomInt(1, array.length);
  const shuffledArray = shuffleArray(array);

  return shuffledArray.slice(0, randomNumber);
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
const offerType = [`flat`, `palac`, `house`, `bungalo`];
const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const generateEntity = () => {
  const locationX = getRandomInt(Coordinate.MIN_X, Coordinate.MAX_X);
  const locationY = getRandomInt(Coordinate.MIN_Y, Coordinate.MAX_Y);
  return {
    'author': {
      'avatar': `https://robohash.org/boom-${getRandomInt(0, 100)}`,
    },
    'offer': {
      'title': offerTitles[getRandomInt(0, offerTitles.length)],
      'address': `${locationX}, ${locationY}`,
      'price': getRandomInt(OfferPrice.MIN, OfferPrice.MAX),
      'type': offerType[getRandomInt(0, offerType.length)],
      'rooms': getRandomInt(OfferRooms.MIN, OfferRooms.MAX),
      'guests': getRandomInt(OfferGuests.MIN, OfferGuests.MAX),
      'checkin': offerCheckInOut[getRandomInt(0, offerCheckInOut.length)],
      'checkout': offerCheckInOut[getRandomInt(0, offerCheckInOut.length)],
      'features': getRandomArray(offerFeatures),
      'description': ``,
      'photos': shuffleArray(offerPhotos),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
    'date': dates[getRandomInt(0, dates.length)],
  };
};

module.exports = generateEntity;
