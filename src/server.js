'use strict';

const {extname} = require(`path`);
const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const readLine = require(`readline`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;
const ContentType = {
  css: `text/css`,
  html: `text/html; charset=UTF-8`,
  jpg: `image/jpeg`,
  ico: `image/x-icon`,
  png: `image/png`,
  gif: `image/gif`,
};

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const createInterface = () => {
  return readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const printDirectory = (relativePath, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${relativePath === `/` ? `` : relativePath}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const readFile = async (path, res) => {
  const data = await readfile(path);
  const extension = extname(path).slice(1);
  const contentType = ContentType[extension] ? ContentType[extension] : `text/plain`;

  res.setHeader(`content-type`, contentType);
  res.end(data);
};

const readDir = async (path, relativePath, res) => {
  const files = await readdir(path);
  res.setHeader(`content-type`, `text/html`);
  res.end(printDirectory(relativePath, files));
};

module.exports = {
  name: `server`,
  description: `принимает на вход номер порта и поднимает сервер`,
  execute() {
    const readLineInterface = createInterface();

    readLineInterface.question(`Введите номер порта: `, (answer) => {
      const port = +answer || PORT;

      readLineInterface.close();

      const server = http.createServer((req, res) => {
        const localPath = url.parse(req.url).pathname;
        const absolutePath = `${__dirname.slice(0, -4)}/static/${localPath}`;

        (async () => {
          try {
            const pathStat = await stat(absolutePath);
            console.log(pathStat);

            res.statusCode = 200;
            res.statusMessage = `OK`;

            if (pathStat.isDirectory()) {
              await readDir(absolutePath, localPath, res);
            } else {
              await readFile(absolutePath, res);
            }
          } catch (e) {
            console.log(e);
            res.writeHead(404, `Not Found`);
            res.end();
          }
        })().catch((e) => {
          res.writeHead(500, e.message, {
            'content-type': `text/plain`
          });
          res.end(e.message);
        });
      });

      server.listen(port, HOSTNAME, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Server running at http://${HOSTNAME}:${port}/`);
      });
    });
  }
};
