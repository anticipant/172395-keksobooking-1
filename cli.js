const packageJSON = require('./package.json');
const getAvailableCommands = () => {
  let commands = [];

  for(commandKey in cliInterface) {
    const command = {
      name: commandKey,
      description: cliInterface[commandKey].description,
    };
    commands.push(command);
  }
  return `Доступные команды:
  ${commands.map((it) => {
    return `${it.name}${` `.repeat(15 - it.name.length)} — ${it.description}`
  }).join(`
  `)}`
};
let cliInterface = {
  '--version': {
    action: () => {console.log(`v${packageJSON.version}`)},
    description: `печатает версию приложения`,
  },
  '--help': {
    description: `выводит возможные команды`,
  },
};

let consoleCommand = (answer) => {
  switch(answer) {

    case `--version`:
      cliInterface[`${answer}`].action();
      break;

    case `--help`:
      console.log(getAvailableCommands());
      break;
    case ``:
      console.log(`Привет пользователь! Эта программа будет запускать сервер «${packageJSON.name}». Автор: anticipant.`);
      break;

    default:
      console.error(`Неизвестная команда {${answer}}. 
Чтобы прочитать правила использования приложения, наберите "--help"`);
      process.exit(1);
  }
};

process.argv.forEach((val, index) => {
  if (index > 1) {
    consoleCommand(val);
  }
});
if (process.argv.length === 2) {
  consoleCommand(``);
}
