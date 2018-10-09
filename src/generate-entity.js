'use strict';

const SEVEN_DAYS = 604800000;
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

const compareRandom = () => {
  return Math.random() - 0.5;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArray = (array) => {
  const randomNumber = offerFeatures[getRandomInt(0, offerFeatures.length)];
  return array.map((it, index) => {
    if (index <= randomNumber) {
      return it;
    }
    return null;
  });
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
const userData = {
  'avatar': `https://robohash.org/boom`,
  'offerTitle': offerTitles[getRandomInt(0, offerTitles.length)],
  'offerPrice': getRandomInt(OfferPrice.MIN, OfferPrice.MAX),
  'offerType': offerCheckInOut[getRandomInt(0, offerType.length)],
  'offerRooms': getRandomInt(OfferRooms.MIN, OfferRooms.MAX),
  'offerGuests': getRandomInt(OfferGuests.MIN, OfferGuests.MAX),
  'offerCheckInOut': offerCheckInOut[getRandomInt(0, offerCheckInOut.length)],
  'offerFeatures': getRandomArray(offerFeatures),
  'offerPhotos': offerPhotos.sort(compareRandom),
  'locationX': getRandomInt(Coordinate.MIN_X, Coordinate.MAX_X),
  'locationY': getRandomInt(Coordinate.MIN_Y, Coordinate.MAX_Y),
  'date': getTimeStamp(),
};

const generateEntity = () => {
  return {
    'author': {
      'avatar': userData.avatar
    },
    'offer': {
      'title': userData.offerTitle,
      'address': `${userData.locationX}, ${userData.locationY}`,
      'price': userData.offerPrice,
      'type': userData.offerType,
      'rooms': userData.offerRooms,
      'guests': userData.offerGuests,
      'checkin': userData.offerCheckInOut,
      'checkout': userData.offerCheckInOut,
      'features': userData.offerFeatures,
      'description': ``,
      'photos': userData.offerPhotos,
    },
    'location': {
      'x': userData.locationX,
      'y': userData.locationY,
    },
    'date': userData.date,
  };
};

module.exports = generateEntity;
