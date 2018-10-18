'use strict';

const colors = require(`colors`);
const cliInterface = require(`./cli-commands`);
const packageInfo = require(`../package.json`);
const generateEntityCli = require(`./generate-entity-cli`);

if (process.argv.length === 2) {
  console.log(colors.green(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`));
  generateEntityCli();
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
