'use strict';

const express = require(`express`);
const multer = require(`multer`);
const validate = require(`../validate`);
const toStream = require(`buffer-to-stream`);
const asyncMiddleware = require(`./async-middle-ware`);

const DefaultParams = {
  SKIP: 0,
  LIMIT: 20,
  TOTAL: 20,
};

const toPage = async (cursor, skip = DefaultParams.SKIP, limit = DefaultParams.LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();

  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

const jsonParser = express.json();


module.exports = (offersRouter) => {

  offersRouter.get(``, asyncMiddleware(async (request, response) => {
    const skipParameter = parseInt(request.query.skip || DefaultParams.SKIP, 10);
    const limitParameter = parseInt(request.query.limit || DefaultParams.LIMIT, 10);

    if (isNaN(skipParameter) || isNaN(limitParameter)) {
      response.status(400).send(`Неверное значение параметра "skip" или "limit"`);
    }

    response.send(await toPage(await offersRouter.offersStore.getAllOffers(), skipParameter, limitParameter));
  }));

  const upload = multer({storage: multer.memoryStorage()});
  const offerUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`}]);

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

};
