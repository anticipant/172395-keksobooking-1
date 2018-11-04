'use strict';

const colors = require(`colors`);
const cliInterface = require(`./cli-commands`);
const packageInfo = require(`../package.json`);
const logger = require(`./logger`);

if (process.argv.length === 2) {
  logger.log(colors.green(`Привет пользователь! Эта программа будет запускать сервер «${packageInfo.name}». Автор: ${packageInfo.author}.`));
} else {
  const [, , command, ...parameters] = process.argv;
  const commandName = command.slice(2);

  if (cliInterface[commandName]) {
    cliInterface[commandName].execute(parameters);
  } else {
    logger.error(colors.red(`Неизвестная команда {${command}}.
Чтобы прочитать правила использования приложения, наберите "--help"`));
    process.exit(1);
  }
}
