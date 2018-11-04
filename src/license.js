'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `печатает название лицензии`,
  execute() {
    console.log(colors.red(packageInfo.license));
    process.exit(0);
  }
};
