'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `печатает название лицензии`,
  execute() {
    console.log(packageInfo.license);
  }
};
