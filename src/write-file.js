'use strict';

const colors = require(`colors`);
const fs = require(`fs`);

const writeFile = (path, data) => {
  fs.writeFile(`${path}/data.json`, data, (err) => {
    if (err) {
      throw err;
    }
    console.log(colors.green(`Файл сохранен!`));
  });
};

module.exports = writeFile;
