'use strict';

const colors = require(`colors`);
const express = require(`express`);
const offerStore = require(`./offers/store`);
const imagesStore = require(`./images/store`);
const offersRouter = require(`./offers/route/index`)(offerStore, imagesStore);
const logger = require(`./logger`);

const {
  SERVER_PORT = 3000,
  SERVER_HOST = `localhost`
} = process.env;

const app = express();

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

const runServer = (port) => {
  port = parseInt(port, 10);

  app.listen(port, (err) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(`example app available on http://${SERVER_HOST}:${port}/`);
  });
};

module.exports = {
  name: `server`,
  description: `принимает на вход номер порта и поднимает сервер`,
  execute(parameters = []) {
    let [port = SERVER_PORT] = parameters;

    if (port > 0) {
      runServer(port);
    } else {
      console.error(colors.red(`Неверно указан номер порта`));
      process.exit(1);
    }
  },
  app
};
