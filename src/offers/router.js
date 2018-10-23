'use strict';

const colors = require(`colors`);
const express = require(`express`);
// eslint-disable-next-line new-cap
const offersRouter = express.Router();
const fs = require(`fs`);

const getOffersDataPath = () => {
  const filePath = `${process.cwd()}/file-information/offers-data-path.json`;
  const isExist = fs.existsSync(filePath);

  if (!isExist) {
    console.log(colors.red(`Сгенерируйте данные`));
    process.exit(0);
  }

  const data = fs.readFileSync(filePath, `utf8`);
  return JSON.parse(data)[`offers-data-path`];
};
const getOffersData = () => {

  const path = getOffersDataPath();
  const data = fs.readFileSync(`${process.cwd()}/${path}/data.json`, `utf8`);

  return JSON.parse(data);
};

offersRouter.get(``, (request, response) => {
  const data = getOffersData();
  const skipParameter = +request.query.skip || data.skip;
  const limitParameter = +request.query.limit || data.limit;
  const finalData = (data.data.slice(skipParameter)).slice(0, limitParameter);

  response.send(finalData);
});

offersRouter.get(`/:date`, (request, response) => {
  const date = request.params.date;

  if (date.length !== 13) {
    response.status(400).send(`В запросе не указана дата`);
  } else {
    const data = getOffersData();
    const skipParameter = +request.query.skip || data.skip;
    const limitParameter = +request.query.limit || data.limit;
    const finalData = (data.data.slice(skipParameter)).slice(0, limitParameter);

    const found = finalData.find((it) => {
      return it.date === +date;
    });
    if (!found) {
      response.status(404).send(`Объявления не найдено!`);
    }
    response.send(found);
  }
});

module.exports = offersRouter;
