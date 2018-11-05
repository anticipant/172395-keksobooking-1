'use strict';

const colors = require(`colors`);

const DEFAULT_INDENT = 15;

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
    return `${colors.grey(it.name)}${` `.repeat(DEFAULT_INDENT - it.name.length)} — ${colors.green(it.description)}`;
  }).join(`
  `)}`;
};

module.exports = {
  name: `help`,
  description: `выводит возможные команды`,
  execute() {
    console.log(getAvailableCommands());
    process.exit(0);
  }
};
