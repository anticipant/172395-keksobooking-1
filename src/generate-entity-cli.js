'use strict';

const colors = require(`colors`);
const generateEntity = require(`./generate-entity`);
const writeFile = require(`./write-file`);
const readLine = require(`readline`);
const fs = require(`fs`);

const createInterface = () => {
  return readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const getDataJSON = (quantity) => {
  let dataArray = [];

  for (let i = 0; i < quantity; i++) {
    dataArray.push(generateEntity());
  }

  return JSON.stringify(dataArray);
};

const isCorrectPathName = (name) => {
  const bannedCharacters = [`?`, `*`, `>`, `<`, `:`, `|`];
  return bannedCharacters.every((it) => {
    return name.indexOf(it) < 0;
  });
};

const appClose = (message = `Хорошего дня!`) => {
  readLineInterface.close();
  console.log(colors.red(`Программа закрыта`));
  console.log(colors.red(message));
  process.exit(0);
};

let readLineInterface;
let dataObject = {
  quantity: 0,
  directory: ``,
};
const questions = [{
  excute(readline) {
    readline.question(`Сгенерировать данные? да/нет `, (answer) => {

      switch (answer) {
        case `да`:
          readline.emit(`line`);
          break;

        case `нет`:
          appClose();
          break;

        default:
          appClose(`'${answer}' - невалидный ответ`);
          break;
      }
    });
  }
}, {
  excute(readline) {
    readline.question(`Сколько элементов нужно создать?(введите число) `, (quantity) => {

      if (quantity > 0) {
        dataObject.quantity = quantity;
      } else {
        appClose(`Неверно указано количество элементов!`);
      }

      readline.emit(`line`);
    });
  }
}, {
  excute(readline) {
    readline.question(`Укажите путь до файла:  `, (path = `user`) => {

      if (!isCorrectPathName(path)) {
        appClose(`Неверно указан путь!`);
      } else {
        dataObject.directory = path;
      }

      readline.emit(`line`);
    });
  }
}];

const generateEntityCli = () => {
  readLineInterface = createInterface();
  readLineInterface.on(`line`, () => {

    if (questions.length !== 0) {
      questions.shift().excute(readLineInterface);
    } else {
      const data = getDataJSON(dataObject.quantity);
      const resultDirectoryPath = `${process.cwd()}/${dataObject.directory}`;
      const isExist = fs.existsSync(`${resultDirectoryPath}/data.json`);

      readLineInterface.close();

      if (isExist) {
        readLineInterface = createInterface();
        readLineInterface.question(colors.grey(`Файл уже существует. Перезаписать? да/нет `), (questionAnswer) => {

          if (questionAnswer === `да`) {
            readLineInterface.close();
            writeFile(resultDirectoryPath, data);
          } else {
            appClose(`Пока...`);
          }
        });
      } else {
        fs.mkdirSync(resultDirectoryPath, {recursive: true}, (err) => {
          if (err) {
            throw err;
          }
        });
        writeFile(resultDirectoryPath, data);
      }
    }
  });
  readLineInterface.emit(`line`);
};

module.exports = generateEntityCli;
