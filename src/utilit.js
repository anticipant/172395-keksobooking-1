'use strict';

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

module.exports = {
  shuffleArray,
  getRandomInt,
  getRandomArray,
};
