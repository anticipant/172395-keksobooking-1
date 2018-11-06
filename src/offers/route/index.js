'use strict';

const express = require(`express`);
const corsRoute = require(`./cors`);
const errorsRoute = require(`./errors`);
const defaultRoute = require(`./default`);
const dateRoute = require(`./date`);

const {Router: router} = express;
const offersRouter = router();

corsRoute(offersRouter);
defaultRoute(offersRouter);
dateRoute(offersRouter);
errorsRoute(offersRouter);

module.exports = (offersStore, imagesStore) => {
  offersRouter.offersStore = offersStore;
  offersRouter.imageStore = imagesStore;
  return offersRouter;
};

