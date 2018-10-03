'use strict';

const packageJSON = require(`./package.json`);
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
let cliInterface = {
  '--version': {
    action: () => {
      console.log(`v${packageJSON.version}`);
    },
    description: `печатает версию приложения`,
  },
  '--help': {
    action: () => {
      console.log(getAvailableCommands());
    },
    description: `выводит возможные команды`,
  },
};

if (process.argv.length === 2) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageJSON.name}». Автор: ${packageJSON.author}.`);
} else {
  process.argv.forEach((it, index) => {
    if (index > 1) {
      if (cliInterface[it]) {
        cliInterface[it].action();
      } else {
        console.error(`Неизвестная команда {${it}}. 
Чтобы прочитать правила использования приложения, наберите "--help"`);
        process.exit(1);
      }
    }
  });
}
