'use strict';

const colors = require(`colors`);
const express = require(`express`);
const fs = require(`fs`);
const offersRouter = express.Router();

const app = express();

app.use(express.static(`static`));

const getOffersDataPath = () => {
  const filePath = `${process.cwd()}/file-information/offers-data-path.json`;
  const isExist = fs.existsSync(filePath);
  if (isExist) {
    const data = fs.readFileSync(filePath, `utf8`);
    return JSON.parse(data)[`offers-data-path`];
  } else {
    console.log(colors.red(`Сгенерируйте данные`));
    process.exit(0);
  }
};
const getOffersData = () => {

  const path = getOffersDataPath();
  const data = fs.readFileSync(`${process.cwd()}/${path}/data.json`, `utf8`);

  return JSON.parse(data);
};


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


offersRouter.get(``, (request, response) => {
  const data = getOffersData();
  const skipParameter = request.query.skip || data.skip;
  const limitParameter = request.query.limit || data.limit;
  const finalData = (data.data.slice(skipParameter)).slice(0, limitParameter);

  response.send(finalData);
});
offersRouter.get(`/:date`, (request, response) => {
  const date = request.params.date;
  console.log(`date`, date);
  if (date.length !== 13) {
    throw `В запросе не указана дата`;
  }

  const found = finalData.find((it) => it.date === date);
  if (!found) {
    throw `Объявления с такой датой не найдено!`;
  }
  res.send(found);
});


app.use(`/api/offers`, offersRouter);
// app.use(`/api/offers`, (request, response) => {
//   const data = getOffersData();
//   response.send(data.data);
// });

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
