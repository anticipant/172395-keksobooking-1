'use strict';

const colors = require(`colors`);
const express = require(`express`);
const offerStore = require(`./offers/store`);
const imagesStore = require(`./images/store`);
const offersRouter = require(`./offers/router`)(offerStore, imagesStore);

const app = express();

app.use(express.static(`static`));

const BAD_REQUEST_HANDLER = (request, response) => {
  response.status(400).send(`Bad Request`);
};
const NOT_FOUND_HANDLER = (request, response) => {
  response.status(404).send(`Page was not found`);
};
const ERROR_HANDLER = (err, request, response) => {
  if (err) {
    console.error(err);
    response.status(err.code || 500).send(err.message);
  }
};

app.use(`/api/offers`, offersRouter);

app.use(NOT_FOUND_HANDLER);

app.use(BAD_REQUEST_HANDLER);

app.use(ERROR_HANDLER);

const PORT = 3000;

const runServer = (port) => {
  port = parseInt(port, 10);

  app.listen(port, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`example app available on http://localhost:${port}/`);
  });
};

module.exports = {
  name: `server`,
  description: `принимает на вход номер порта и поднимает сервер`,
  execute(parameters = []) {
    let [port = PORT] = parameters;

    if (port > 0) {
      runServer(port);
    } else {
      console.error(colors.red(`Неверно указан номер порта`));
      process.exit(1);
    }
  },
  app
};
