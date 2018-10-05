'use strict';

const colors = require('colors');
const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `печатает имя автора приложения`,
  execute() {
    console.log(packageInfo.author.blue);
  }
};
