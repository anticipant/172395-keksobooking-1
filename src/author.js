'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

module.exports = {
  name: `author`,
  description: `печатает имя автора приложения`,
  execute() {
    logger.info(colors.blue(packageInfo.author));
    process.exit(0);
  }
};
