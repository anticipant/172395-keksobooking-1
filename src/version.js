'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);

const versionParts = packageInfo.version.split(`.`);

module.exports = {
  name: `version`,
  description: `печатает версию приложения`,
  execute() {
    console.log(`v${colors.red(versionParts[0])}.${colors.green(versionParts[1])}.${colors.blue(versionParts[2])}`);
    process.exit(0);
  }
};
