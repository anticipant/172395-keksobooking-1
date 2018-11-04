'use strict';

const colors = require(`colors`);
const fs = require(`fs`);
const logger = require(`./logger`);

const writeFile = (path, data) => {
  fs.writeFile(`${path}/data.json`, data, (err) => {
    if (err) {
      throw err;
    }
    logger.info(colors.green(`Файл сохранен!`));
  });
};

module.exports = writeFile;
