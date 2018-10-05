'use strict';

const colors = require('colors');
const cliInterface = require(`./cli-commands`);
const packageInfo = require(`../package.json`);

if (process.argv.length === 2) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`);
} else {
  const command = process.argv[2].slice(2);
  if (cliInterface[command]) {
    cliInterface[command].execute();
  } else {
    console.error(`Неизвестная команда {${command}}.
Чтобы прочитать правила использования приложения, наберите "--help"`.red);
    process.exit(1);
  }
}
