'use strict';

const ValidationError = require(`../errors/validation-error`);

const validate = (data) => {
  const errors = [];
  if (!data.date) {
    errors.push(`Field date "date" is required!`);
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return {
    "name": data.name,
    "title": data.title,
    "address": data.address,
    "description": data.description,
    "price": data.price,
    "type": data.type,
    "rooms": data.rooms,
    "guests": data.guests,
    "checkin": data.checkin,
    "checkout": data.checkout,
    "features": data.features,
    "location": {
      "x": data.address.split(`, `)[0],
      "y": data.address.split(`, `)[1]
    }
  };
};

module.exports = validate;
