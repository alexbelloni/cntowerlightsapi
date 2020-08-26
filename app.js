const express = require('express');
const cors = require('cors');
const app = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use(cors());

const routes = require('./routes/api');

app.use(routes);
/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
*/
app.listen(app.get('port'), function() {
  console.log("Node app is running at http://localhost:" + app.get('port'))
});
