'use strict';

const asyncMiddleware = require(`./async-middle-ware`);
const logger = require(`../../logger`);

module.exports = (offersRouter) => {

  offersRouter.get(`/:date`, asyncMiddleware(async (request, response) => {
    const date = parseInt(request.params.date, 10);

    if (isNaN(date) || `${date}`.length !== 13) {
      response.status(400).send(`В запросе не указана дата`);
    } else {
      const found = await offersRouter.offersStore.getOffer(date);

      if (!found) {
        response.status(404).send(`Объявления не найдено!`);
      } else {
        response.send(found);
      }
    }
  }));

  offersRouter.get(`/:date/avatar`, asyncMiddleware(async (request, response) => {
    const date = parseInt(request.params.date, 10);

    if (isNaN(date) || `${date}`.length !== 13) {
      response.status(400).send(`В запросе не указана дата`);
    }

    const found = await offersRouter.offersStore.getOffer(date);

    if (!found) {
      response.status(404).send(`Объявления не найдено!`);
    }

    const result = await offersRouter.imageStore.get(found._id);
    if (!result) {
      response.status(404).send(`Аватар для объявления не найден`);
    }

    response.header(`Content-Type`, `image/jpg`);
    response.header(`Content-Length`, result.info.length);

    response.on(`error`, (e) => logger.error(e));
    response.on(`end`, () => response.end());
    const stream = result.stream;
    stream.on(`error`, (e) => logger.error(e));
    stream.on(`end`, () => response.end());
    stream.pipe(response);
  }));

};
