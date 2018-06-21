const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

const routes = require('./routes/api');

app.use(routes);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
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