'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

module.exports = {
  name: `license`,
  description: `печатает название лицензии`,
  execute() {
    logger.info(colors.red(packageInfo.license));
    process.exit(0);
  }
};
