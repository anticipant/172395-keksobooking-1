'use strict';

const colors = require(`colors`);
const cliInterface = require(`./cli-commands`);
const packageInfo = require(`../package.json`);
const fs = require(`fs`);
const readline = require(`readline`);
const generateEntity = require(`./generate-entity`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let dataObject = {
  quantity: 0,
  directory: ``,
};
const getData = () => {
  let boom = [];
  for (let i = 0; i < dataObject.quantity; i++) {
    boom.push(generateEntity());
  }
  fs.mkdir(dataObject.directory, () => {

  });
  console.log(boom);
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
      console.log(`неверно указано количество, попробуйте заново!`);
      rl.close();
    }
  },
  setPromptPathName: () => {
    rl.setPrompt(`Укажите путь до файла: `);
    rl.prompt();
  },
  setPathName: (fileName = `data`) => {
    dataObject.directory = fileName;
  },
};
if (process.argv.length === 2) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`);

  // здесь надо предложить пользователю ввести данные
  rl.question(`Сгенерировать данные? да/нет `, (answer) => {

    // todo создать константу в которой будут перечисленны все синонимы ответа да и ответа нет

    switch (answer) {
      case `да`:
        let questionsNames = [`setPromptQuantity`, `setQuantityValue`, `setPromptPathName`, `setPathName`];

        rl.on(`line`, (line) => {

          questions[questionsNames.shift()](line);

          if (questionsNames.length === 0) {
            console.log(colors.red(`вопросы закончились`));
            console.log(colors.red(dataObject));
            rl.close();
            getData();
          }

        });
        rl.emit(`line`);
        break;
      case `нет`:
        rl.close();
        console.log(`Хорошего дня!`);
        process.exit(0);
        break;
      default:
        console.log(`'${answer}' - невалидный ответ. Введите 'да', если хотите сгенирировать данные или 'нет', если не хотите`);
    }
    // fs.mkdir(`sss`, (err) => {
    // console.log(err);
    // });
    // // console.log(`Thank you for your valuable feedback: ${answer}`);
    //
    // rl.close();
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
