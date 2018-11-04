'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

module.exports = {
  name: `version`,
  description: `печатает версию приложения`,
  execute() {
    logger.info(`v${packageInfo.version.split(`.`).map((it, index) => {
      let number = it;
      switch (index) {
        case 0:
          number = colors.red(it);
          break;
        case 1:
          number = colors.green(it);
          break;
        case 2:
          number = colors.blue(it);
          break;
      }
      return number;
    }).join(`.`)}`);
    process.exit(0);
  }
};
