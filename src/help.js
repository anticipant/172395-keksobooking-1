'use strict';

const colors = require(`colors`);
const logger = require(`./logger`);

const getAvailableCommands = () => {
  const cliInterface = require(`./cli-commands`);
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
    return `${colors.grey(it.name)}${` `.repeat(15 - it.name.length)} — ${colors.green(it.description)}`;
  }).join(`
  `)}`;
};
module.exports = {
  name: `help`,
  description: `выводит возможные команды`,
  execute() {
    logger.info(getAvailableCommands());
    process.exit(0);
  }
};
