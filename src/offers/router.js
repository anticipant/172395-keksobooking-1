'use strict';

const express = require(`express`);
const generateEntity = require(`../generate-entity`);
const multer = require(`multer`);

const ValidationError = require(`../errors/validation-error`);
const validate = require(`./validate`);

const DefaultParams = {
  SKIP: 0,
  LIMIT: 20,
  TOTAL: 20,
};
const upload = multer({storage: multer.memoryStorage()});

const {Router: router} = express;

const offersRouter = router();

const jsonParser = express.json();

const getOffersData = (quantity = DefaultParams.TOTAL) => {
  const offers = [];

  for (let i = 0; i < quantity; i++) {
    offers.push(generateEntity());
  }

  return offers;
};

const offersData = getOffersData();

const getFinalData = (request, data) => {
  const skipParameter = +request.query.skip || DefaultParams.SKIP;
  const limitParameter = +request.query.limit || DefaultParams.LIMIT;

  return data.slice(skipParameter, skipParameter + limitParameter);
};

offersRouter.get(``, (request, response) => {
  const finalData = getFinalData(request, offersData);

  response.send(finalData);
});

offersRouter.get(`/:date`, (request, response) => {
  const date = request.params.date;

  if (date.length !== 13) {
    response.status(400).send(`В запросе не указана дата`);
  } else {
    const finalData = getFinalData(request, offersData);

    const found = finalData.find((it) => {
      return it.date === +date;
    });
    if (!found) {
      response.status(404).send(`Объявления не найдено!`);
    }
    response.send(found);
  }
});
const offerUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]);

offersRouter.post(``, jsonParser, offerUpload, (request, response) => {
  const body = request.body;
  const images = request.files;

  if (Object.keys(images).length !== 0) {
    body.images = images;
  }
  response.send(validate(body));
});

offersRouter.use((err, request, response, _next) => {
  if (err instanceof ValidationError) {
    response.status(err.code).json(err.errors);
  }
});

module.exports = offersRouter;
