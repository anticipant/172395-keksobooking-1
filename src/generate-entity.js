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

  let resultArray = [];
  for (let i = 0; i < randomNumber; i++) {
    resultArray.push(array[i]);
  }

  return resultArray;
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
const getDataItem = (quantity) => {
  let dataArray = [];

  for (let i = 0; i < quantity; i++) {
    dataArray.push({
      'avatar': `https://robohash.org/boom`,
      'offerTitle': offerTitles[getRandomInt(0, offerTitles.length)],
      'offerPrice': getRandomInt(OfferPrice.MIN, OfferPrice.MAX),
      'offerType': offerType[getRandomInt(0, offerType.length)],
      'offerRooms': getRandomInt(OfferRooms.MIN, OfferRooms.MAX),
      'offerGuests': getRandomInt(OfferGuests.MIN, OfferGuests.MAX),
      'offerCheckInOut': offerCheckInOut[getRandomInt(0, offerCheckInOut.length)],
      'offerFeatures': getRandomArray(offerFeatures),
      'offerPhotos': shuffleArray(offerPhotos),
      'locationX': getRandomInt(Coordinate.MIN_X, Coordinate.MAX_X),
      'locationY': getRandomInt(Coordinate.MIN_Y, Coordinate.MAX_Y),
      'date': getTimeStamp(),
    });
  }

  return dataArray;
};
const userData = getDataItem(10);

const generateEntity = () => {
  return userData.map((it) => {
    return {
      'author': {
        'avatar': it.avatar
      },
      'offer': {
        'title': it.offerTitle,
        'address': `${it.locationX}, ${it.locationY}`,
        'price': it.offerPrice,
        'type': it.offerType,
        'rooms': it.offerRooms,
        'guests': it.offerGuests,
        'checkin': it.offerCheckInOut,
        'checkout': it.offerCheckInOut,
        'features': it.offerFeatures,
        'description': ``,
        'photos': it.offerPhotos,
      },
      'location': {
        'x': it.locationX,
        'y': it.locationY,
      },
      'date': it.date,
    };
  });
};

module.exports = generateEntity;
