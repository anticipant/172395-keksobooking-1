'use strict';

const cliInterface = require(`./cli-commands`);
const packageInfo = require(`../package.json`);

if (process.argv.length === 2) {
  console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`);
} else {
  process.argv.slice(2).forEach((it) => {
    const command = it.slice(2);

    if (cliInterface[command]) {
      cliInterface[command].execute();
    } else {
      console.error(`Неизвестная команда {${it}}.
Чтобы прочитать правила использования приложения, наберите "--help"`);
      process.exit(1);
    }
  });
}
