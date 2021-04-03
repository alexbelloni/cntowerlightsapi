const express = require('express');
const cors = require('cors');
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cors());

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  definition: {
    info: {
      title: "CN Tower Lights API",
      version: "1.0.0",
      description: "The current CN Tower's color agenda",
      contact: {
        name: "Alexandre Alves",
        url: "https://alexandrebelloni.com"
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    }
  },
  "host": "https://tower-lights.herokuapp.com/",
  "basePath": "/",
  schemes:[
    "https"
  ],  
  apis: ["./routes/api.js"],
  "swagger": "2.0",
  "paths": { },
  "definitions": { },
  "responses": { },
  "parameters": { },
  "securityDefinitions": { }
}

const swaggerDoc = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const routes = require('./routes/api');

app.use(routes);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at http://localhost:" + app.get('port'))
});
