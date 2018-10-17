'use strict';

const colors = require(`colors`);
const generateEntity = require(`./generate-entity`);
const writeFile = require(`./write-file`);
const readline = require(`readline`);
const fs = require(`fs`);


const createInterface = () => {
  return readline.createInterface({
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
  readlineInterface.close();
  console.log(colors.red(`Программа закрыта`));
  console.log(colors.red(message));
  process.exit(0);
};

const questions = {
  setPromptQuantity: () => {
    readlineInterface.setPrompt(`Сколько элементов нужно создать?(введите число) `);
    readlineInterface.prompt();
  },
  setQuantityValue: (quantity = 1) => {
    if (quantity > 0) {
      dataObject.quantity = quantity;
      readlineInterface.emit(`line`);
    } else {
      appClose(`Неверно указано количество элементов!`);
    }
  },
  setPromptPathName: () => {
    readlineInterface.setPrompt(`Укажите путь до файла:  `);
    readlineInterface.prompt();
  },
  setPathName: (path = `user`) => {
    if (!isCorrectPathName(path)) {
      appClose(`Неверно указан путь!`);
    } else {
      dataObject.directory = path;
    }
  },
};
let readlineInterface = createInterface();
let dataObject = {
  quantity: 0,
  directory: ``,
};

const generateEntityCli = () => {

  readlineInterface.question(`Сгенерировать данные? да/нет `, (answer) => {

    switch (answer) {
      case `да`:
        let namesOfTheActions = [`setPromptQuantity`, `setQuantityValue`, `setPromptPathName`, `setPathName`];

        readlineInterface.on(`line`, (line) => {

          questions[namesOfTheActions.shift()](line);

          if (namesOfTheActions.length === 0) {
            const data = getDataJSON(dataObject.quantity);
            const resultDirectoryPath = `${process.cwd()}/${dataObject.directory}`;
            const isExist = fs.existsSync(`${resultDirectoryPath}/data.json`);

            readlineInterface.close();

            if (isExist) {
              readlineInterface = createInterface();
              readlineInterface.question(colors.grey(`Файл уже существует. Перезаписать? да/нет `), (questionAnswer) => {

                if (questionAnswer === `да`) {
                  readlineInterface.close();
                  writeFile(resultDirectoryPath, data);
                } else {
                  appClose(`Пока...`);
                }
              });
            } else {
              fs.mkdirSync(resultDirectoryPath, { recursive: true }, (err) => {
                if (err) throw err;
              });
              writeFile(resultDirectoryPath, data);
            }
          }
        });
        readlineInterface.emit(`line`);
        break;

      case `нет`:
        appClose();
        break;

      default:
        appClose(`'${answer}' - невалидный ответ`);
        break;
    }
  });
};

module.exports = generateEntityCli;
