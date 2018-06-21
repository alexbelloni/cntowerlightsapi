const hostname = process.env.hostname || 'http://127.0.0.1';
const port = process.env.port || 3000;

const express = require('express');
const routes = require('./routes/api');
const app = express();
app.use(routes);

app.listen(port, () => {
    const myPort = port ? ":"+port : '';
    console.log('port: ', port);
    console.log(`Server via express running at ${hostname}${myPort}/`);
  });

/*
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/