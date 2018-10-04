'use strict';

const cliInterface =  require(`./src/cli-interface`);
// const help =  require(`./src/help`);
// const version =  require(`./src/version`);
// const cliInterface = {
//   help,
//   version,
// };

const packageInfo = require(`./package.json`);

const getAvailableCommands = () => {
  let commands = [];

  for (let commandKey in cliInterface) {
    if (cliInterface.hasOwnProperty(commandKey)) {
      const command = {
        name: commandKey,
        description: cliInterface[commandKey].description,
      };
      commands.push(command);
    }
  }
  return `Доступные команды:
  ${commands.map((it) => {
    return `${it.name}${` `.repeat(15 - it.name.length)} — ${it.description}`;
  }).join(`
  `)}`;
};

// функция которая берет название команды как параметр.
// ищет ее с массиве it.name, если находит выполняет
//
let executeCommand = (commandName) => {
  let command = commandName.slice(2);

  console.log(cliInterface);
  console.log(cliInterface[command].execute());
};

if (process.argv.length === 2) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`);
} else {
  process.argv.forEach((it, index) => {
    if (index > 1) {
      executeCommand(it);
//       if (cliInterface[it]) {
//         cliInterface[it].action();
//       } else {
//         console.error(`Неизвестная команда {${it}}.
// Чтобы прочитать правила использования приложения, наберите "--help"`);
//         process.exit(1);
//       }
    }
  });
}
