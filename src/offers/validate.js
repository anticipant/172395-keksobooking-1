'use strict';

const ValidationError = require(`../errors/validation-error`);
const util = require(`../util`);

const SEVEN_DAYS = 7 * 24 * 60 * 1000;

const ADDRESS_MIN_LENGTH = 100;

const MIME_IMAGE_TYPES = [`image/jpg`, `image/jpeg`, `image/gif`, `image/png`];

const OFFERS_DEFAULT_NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

const Price = {
  MIN: 1,
  MAX: 100000,
};

const TitleLength = {
  MIN: 30,
  MAX: 140,
};

const CountOfRooms = {
  MIN: 0,
  MAX: 1000,
};

const validateTime = (time) => {
  const timeArray = time.split(`:`);
  const hours = parseInt(timeArray[0], 10);
  const minutes = parseInt(timeArray[1], 10);
  const isHours = hours < 24 && hours >= 0;
  const isMinutes = minutes < 60 && minutes >= 0;

  return isHours && isMinutes;
};

const checkFeatureArray = (array) => {
  let offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  let isUnique = true;
  for (let i = 0; i < array.length; i++) {
    if (offerFeatures.indexOf(array[i]) < 0) {
      isUnique = false;
    } else {
      offerFeatures[i] = null;
    }
  }

  return isUnique;
};

const getTimeStamp = () => {
  const currentTime = Date.now();
  const weekAgo = currentTime - SEVEN_DAYS;
  return Math.floor(Math.random() * (currentTime - weekAgo)) + weekAgo;
};

const offerTypePossibleContent = [`flat`, `palace`, `house`, `bungalo`];

const validate = (data) => {
  const errors = [];
  let resultObject = {};
  let offerName = data.name;
  let avatar;
  let preview;
  if (data.images) {
    avatar = data.images[`avatar`] && data.images[`avatar`][0];
    preview = data.images[`preview`] && data.images[`preview`][0];
  }
  const offerDate = data.date || getTimeStamp();
  const offerTitle = data.title;
  const offerAddress = data.address;
  const offerPrice = +data.price;
  const offerType = data.type;
  const offerRooms = +data.rooms;
  const offerCheckin = data.checkin;
  const offerCheckout = data.checkout;
  const offerFeatures = data.features || [];


  if (!offerTitle) {
    errors.push(`Field title "title" is required!`);
  } else if (typeof offerTitle !== `string` || offerTitle.length < TitleLength.MIN || offerTitle.length > TitleLength.MAX) {
    errors.push(`Field "title", length should be less 140 than and more than 30`);
  }
  if (!offerType) {
    errors.push(`Field type "type" is required!`);
  } else if (offerTypePossibleContent.indexOf(offerType) < 0) {
    errors.push(`Field "type" must be a "string" and contains one of the value: flat, house, bungalo, palace`);
  }
  if (!offerPrice) {
    errors.push(`Field price "price" is required!`);
  } else if (offerPrice < Price.MIN || offerPrice > Price.MAX) {
    errors.push(`Field "price", must be a "number" and more 1 than and less than 1000000`);
  }
  if (!offerAddress) {
    errors.push(`Field address "address" is required!`);
  } else if (typeof offerAddress !== `string` || offerAddress.length > ADDRESS_MIN_LENGTH) {
    errors.push(`Field "address" must be a "string" and has length less 100`);
  }
  if (!offerCheckin) {
    errors.push(`Field checkin "checkin" is required!`);
  } else if (typeof offerCheckin !== `string` || !validateTime(offerCheckin)) {
    errors.push(`Field "checkin" must be a "string" and have format "HH:mm"`);
  }
  if (!offerCheckout) {
    errors.push(`Field checkout "checkout" is required!`);
  } else if (typeof offerCheckout !== `string` || !validateTime(offerCheckout)) {
    errors.push(`Field "checkout" must be a "string" and have format "HH:mm"`);
  }
  if (!offerRooms) {
    errors.push(`Field rooms "rooms" is required!`);
  } else if (offerRooms < CountOfRooms.MIN || offerRooms > CountOfRooms.MAX) {
    errors.push(`Field "rooms", must be a "number" and more 0 than and less than 1000`);
  }
  if (!checkFeatureArray(offerFeatures)) {
    errors.push(`Field "features", must contains non-repeating values from the following: dishwasher, elevator, conditioner, parking, washer, wifi`);
  }
  if (!offerName) {
    offerName = OFFERS_DEFAULT_NAMES[util.getRandomInteger(0, OFFERS_DEFAULT_NAMES.length)];
  }
  if (avatar && MIME_IMAGE_TYPES.indexOf(avatar.mimetype) < 0) {
    errors.push(`Incorrect MIME type of avatar`);
  }
  if (preview && MIME_IMAGE_TYPES.indexOf(preview.mimetype) < 0) {
    errors.push(`Incorrect MIME type of preview`);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  resultObject.date = offerDate;
  resultObject.offer = {

    "title": offerTitle,
    "address": offerAddress,
    "price": offerPrice,
    "type": offerType,
    "rooms": offerRooms,
    "guests": data.guests,
    "checkin": offerCheckin,
    "checkout": offerCheckout,
    "features": offerFeatures,
    "description": data.description,
    "photos": [],
  };
  resultObject.location = {
    "x": data.address.split(`, `)[0],
    "y": data.address.split(`, `)[1]
  };
  resultObject.author = {
    name: offerName,
  };
  if (avatar) {
    resultObject.author.avatar = `/api/offers/${offerDate}/avatar`;
  }
  return resultObject;
};

module.exports = validate;
