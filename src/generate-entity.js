'use strict';

const SEVEN_DAYS = 7 * 24 * 60 * 1000;
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

const getTimeStamp = () => {
  const currentTime = Date.now();
  const weekAgo = currentTime - SEVEN_DAYS;
  return Math.floor(Math.random() * (currentTime - weekAgo)) + weekAgo;
};

const shuffleArray = (array) => {
  let resultArray = array.slice();

  for (let i = resultArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }
  return resultArray;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArray = (array) => {
  const randomNumber = getRandomInt(0, offerFeatures.length);

  return array.slice(0, randomNumber);
};

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
      'avatar': `https://robohash.org/boom`,
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
    'date': getTimeStamp(),
  };
};

module.exports = generateEntity;
