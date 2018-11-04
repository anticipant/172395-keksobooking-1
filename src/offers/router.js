'use strict';

const express = require(`express`);
const multer = require(`multer`);
const MongoError = require(`mongodb`).MongoError;
const ValidationError = require(`../errors/validation-error`);
const validate = require(`./validate`);
const toStream = require(`buffer-to-stream`);
const logger = require(`../logger`);

const DefaultParams = {
  SKIP: 0,
  LIMIT: 20,
  TOTAL: 20,
};

const upload = multer({storage: multer.memoryStorage()});

const {Router: router} = express;

const offersRouter = router();

const jsonParser = express.json();

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = async (cursor, skip = DefaultParams.SKIP, limit = DefaultParams.LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();

  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

offersRouter.get(``, asyncMiddleware(async (request, response) => {
  const skipParameter = parseInt(request.query.skip || DefaultParams.SKIP, 10);
  const limitParameter = parseInt(request.query.limit || DefaultParams.LIMIT, 10);

  if (isNaN(skipParameter) || isNaN(limitParameter)) {
    response.status(400).send(`Неверное значение параметра "skip" или "limit"`);
  }

  response.send(await toPage(await offersRouter.offersStore.getAllOffers(), skipParameter, limitParameter));
}));

offersRouter.get(`/:date`, asyncMiddleware(async (request, response) => {
  const date = parseInt(request.params.date, 10);

  if (isNaN(date) || `${date}`.length !== 13) {
    response.status(400).send(`В запросе не указана дата`);
  } else {
    const found = await offersRouter.offersStore.getOffer(date);

    if (!found) {
      response.status(404).send(`Объявления не найдено!`);
    }
    response.send(found);
  }
}));
const offerUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]);

offersRouter.post(``, jsonParser, offerUpload, asyncMiddleware(async (request, response) => {
  const body = request.body;
  const images = request.files;
  let avatar;

  if (Object.keys(images).length !== 0) {
    body.images = images;
    avatar = body.images[`avatar`] && body.images[`avatar`][0];
  }

  const validated = validate(body);

  const result = await offersRouter.offersStore.saveOffer(validated);

  const insertedId = result.insertedId;

  if (avatar) {
    await offersRouter.imageStore.save(insertedId, toStream(avatar.buffer));
  }

  response.send(validated);
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

offersRouter.use(NOT_FOUND_HANDLER);

offersRouter.use(BAD_REQUEST_HANDLER);

offersRouter.use(ERROR_HANDLER);


module.exports = (offersStore, imagesStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imageStore = imagesStore;
  return offersRouter;
};

