'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

module.exports = {
  name: `description`,
  description: `печатает описание приложения`,
  execute() {
    logger.info(colors.blue(packageInfo.description));
    process.exit(0);
  }
};
