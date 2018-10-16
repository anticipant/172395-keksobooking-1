'use strict';

const fs = require(`fs`);

const createDirectory = (path) => {
  path.split(`/`).reduce((previousPath, it, index) => {
    let currentDirectory;

    if (index === 0) {
      currentDirectory = previousPath + it;
    } else {
      currentDirectory = previousPath + `/` + it;
    }

    try {
      fs.mkdirSync(currentDirectory);
    } catch (err) {

      if (err.code === `EEXIST`) {
        return currentDirectory;
      }
    }

    return currentDirectory;
  }, ``);
};

module.exports = createDirectory;
