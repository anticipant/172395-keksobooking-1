'use strict';

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
    return `${it.name}${` `.repeat(15 - it.name.length)} — ${it.description}`;
  }).join(`
  `)}`;
};
module.exports = {
  name: `help`,
  description: `выводит возможные команды`,
  execute() {
    console.log(getAvailableCommands());
  }
};
