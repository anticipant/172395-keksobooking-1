'use strict';

const colors = require('colors');
const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `печатает версию приложения`,
  execute() {
    console.log(`v${packageInfo.version.split(`.`).map((it, index) => {
      let number = it;
      switch (index) {
        case 0:
          number = it.red;
          break;
        case 1:
          number = it.green;
          break;
        case 2:
          number = it.blue;
          break;
      }
      return number;
    }).join(`.`)}`);
  }
};
