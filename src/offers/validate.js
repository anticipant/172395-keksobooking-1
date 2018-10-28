'use strict';

const ValidationError = require(`../errors/validation-error`);
const utilit = require(`../utilit`);

const Price = {
  MIN: 1,
  MAX: 1000000,
};

const ADDRESS_MIN_LENGTH = 100;

const mimeImageTypes = [`image/jpg`, `image/gif`, `image/png`];

const namesArray = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

const TitleLength = {
  MIN: 30,
  MAX: 140,
};

const CountOfRooms = {
  MIN: 0,
  MAX: 1000,
};

const isInvalidTime = (time) => {
  return !time.match(/^(((0|1)?[0-9])|(2[0-3])):[0-5][0-9]$/gi);

};

const checkFeatureArray = (array) => {
  let offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  let isUniq = true;
  for (let i = 0; i < array.length; i++) {
    if (offerFeatures.indexOf(array[i]) < 0) {
      isUniq = false;
    } else {
      offerFeatures[i] = null;
    }
  }

  return isUniq;
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
  const offerDate = data.date;
  const offerTitle = data.title;
  const offerAddress = data.address;
  const offerPrice = +data.price;
  const offerType = data.type;
  const offerRooms = +data.rooms;
  const offerCheckin = data.checkin;
  const offerCheckout = data.checkout;
  const offerFeatures = data.features;


  if (!offerDate) {
    errors.push(`Field date "date" is required!`);
  }
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
  } else if (typeof offerCheckin !== `string` || isInvalidTime(offerCheckin)) {
    errors.push(`Field "checkin" must be a "string" and have format "HH:mm"`);
  }
  if (!offerCheckout) {
    errors.push(`Field checkout "checkout" is required!`);
  } else if (typeof offerCheckout !== `string` || isInvalidTime(offerCheckout)) {
    errors.push(`Field "checkout" must be a "string" and have format "HH:mm"`);
  }
  if (!offerRooms) {
    errors.push(`Field rooms "rooms" is required!`);
  } else if (offerRooms < CountOfRooms.MIN || offerRooms > CountOfRooms.MAX) {
    errors.push(`Field "rooms", must be a "number" and more 0 than and less than 1000`);
  }
  if (!checkFeatureArray(offerFeatures)) {
    errors.push(`Field "rooms", must contains non-repeating values from the following: dishwasher, elevator, conditioner, parking, washer, wifi`);
  }
  if (!offerName) {
    offerName = namesArray[utilit.getRandomInt(0, namesArray.length)];
  }
  if (avatar && mimeImageTypes.indexOf(avatar.mimetype) < 0) {
    errors.push(`Incorrect MIME type of avatar`);
  }
  if (preview && mimeImageTypes.indexOf(preview.mimetype) < 0) {
    errors.push(`Incorrect MIME type of preview`);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  resultObject.date = offerDate;
  resultObject.offer = {

    "title": offerTitle,
    "address": offerAddress,
    "description": data.description,
    "price": offerPrice,
    "type": offerType,
    "rooms": offerRooms,
    "guests": data.guests,
    "checkin": offerCheckin,
    "checkout": data.checkout,
    "features": offerFeatures,
    "location": {
      "x": data.address.split(`, `)[0],
      "y": data.address.split(`, `)[1]
    }
  };
  resultObject.author = {
    name: offerName,
  };
  if (avatar) {
    resultObject.author.avatar = `api/offers/${offerDate}/${avatar.originalname}`;
  }
  return resultObject;
};

module.exports = validate;
