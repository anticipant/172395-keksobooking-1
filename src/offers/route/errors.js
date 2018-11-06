'use strict';

const MongoError = require(`mongodb`).MongoError;
const ValidationError = require(`../../errors/validation-error`);

const BAD_REQUEST_HANDLER = (request, response) => {
  response.status(400).send(`Bad Request`);
};
const NOT_FOUND_HANDLER = (request, response) => {
  response.status(404).send(`Page was not found`);
};
const ERROR_HANDLER = (err, request, response, _next) => {
  if (err instanceof ValidationError) {
    response.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    response.status(400).json(err.message);
    return;
  }
  response.status(err.code || 500).send(err.message);
};

module.exports = (offersRouter) => {

  offersRouter.use(NOT_FOUND_HANDLER);

  offersRouter.use(BAD_REQUEST_HANDLER);

  offersRouter.use(ERROR_HANDLER);
};
