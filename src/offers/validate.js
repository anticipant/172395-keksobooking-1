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
  return data;
};

module.exports = validate;
