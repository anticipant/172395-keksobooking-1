'use strict';

const colors = require(`colors`);
const cliInterface = require(`./cli-commands`);
const packageInfo = require(`../package.json`);
const generateEntity = require(`./generate-entity`);
const readline = require(`readline`);
const fs = require(`fs`);

const DATA_DIRECTORY = `data/`;

const createInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};
let rl = createInterface();
let dataObject = {
  quantity: 0,
  directory: ``,
};
const getDataJSON = () => {
  let array = [];
  for (let i = 0; i < dataObject.quantity; i++) {
    array.push(generateEntity());
  }

  return JSON.stringify(array);
};
const isCorrectPathName = (name) => {
  if (name.indexOf(`/`) === 0) {
    return false;
  }
  const bannedCharacters = [`?`, `*`, `>`, `<`, `:`, `|`];
  return bannedCharacters.every((it) => {
    return name.indexOf(it) < 0;
  });
};
const appClose = (message = `Хорошего дня!`) => {
  rl.close();
  console.log(colors.red(`Программа закрыта`));
  console.log(colors.red(message));
  process.exit(0);
};
const questions = {
  setPromptQuantity: () => {
    rl.setPrompt(`Сколько элементов нужно создать?(введите число) `);
    rl.prompt();
  },
  setQuantityValue: (quantity = 1) => {
    if (quantity > 0) {
      dataObject.quantity = quantity;
      rl.emit(`line`);
    } else {
      appClose(`Неверно указано количество элементов!`);
    }
  },
  setPromptPathName: () => {
    rl.setPrompt(`Укажите относительный путь до файла: (пример: 'users/user-1') `);
    rl.prompt();
  },
  setPathName: (path = `user`) => {
    if (!isCorrectPathName(path)) {
      appClose(`Неверно указан путь!`);
    } else {
      dataObject.directory = path;
    }
  },
};
if (process.argv.length === 2) {

  console.log(colors.green(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`));

  rl.question(`Сгенерировать данные? да/нет `, (answer) => {

    switch (answer) {
      case `да`:
        let namesOfTheActions = [`setPromptQuantity`, `setQuantityValue`, `setPromptPathName`, `setPathName`];

        rl.on(`line`, (line) => {

          questions[namesOfTheActions.shift()](line);

          if (namesOfTheActions.length === 0) {
            const data = getDataJSON();
            const resultDirectoryPath = DATA_DIRECTORY + dataObject.directory;
            rl.close();

            resultDirectoryPath.split(`/`).reduce((previousPath, it, index) => {
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

            const writeFile = () => {
              fs.writeFile(`${resultDirectoryPath}/data.json`, data, (err) => {
                if (err) {
                  throw err;
                }
                console.log(colors.green(`The file has been saved!`));
              });
            };
            const isExist = fs.existsSync(`${resultDirectoryPath}/data.json`);

            if (isExist) {
              rl = createInterface();
              rl.question(colors.grey(`Файл уже существует. Перезаписать? да/нет `), (questionAnswer) => {
                if (questionAnswer === `да`) {
                  rl.close();
                  writeFile();
                } else {
                  appClose(`Пока...`);
                }
              });

            } else {
              writeFile();
            }
          }
        });
        rl.emit(`line`);

        break;

      case `нет`:
        appClose();

        break;

      default:
        appClose(`'${answer}' - невалидный ответ`);

        break;
    }
  });

} else {
  const command = process.argv[2].slice(2);
  if (cliInterface[command]) {
    cliInterface[command].execute();
  } else {
    console.error(colors.red(`Неизвестная команда {${command}}.
Чтобы прочитать правила использования приложения, наберите "--help"`));
    process.exit(1);
  }
}
