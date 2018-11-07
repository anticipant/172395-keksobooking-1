'use strict';

const DATA_QUANTITY = 20;

const getOffersData = (generateEntity) => {
  const offers = [];

  for (let i = 0; i < DATA_QUANTITY; i++) {
    offers.push(generateEntity());
  }

  return offers;
};

const shuffleArray = (array) => {
  const arrayLength = array.length;
  let initialArray = array.slice();
  let shuffledArray = [];

  for (let i = 0; i < arrayLength; i++) {
    let position = getRandomInteger(0, initialArray.length);
    shuffledArray.push(initialArray.splice(position, 1)[0]);
  }

  return shuffledArray;
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArray = (array) => {
  const randomNumber = getRandomInteger(1, array.length);
  const shuffledArray = shuffleArray(array);

  return shuffledArray.slice(0, randomNumber);
};

module.exports = {
  shuffleArray,
  getRandomInteger,
  getRandomArray,
  getOffersData,
};
