'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const documentRoute = require('./routes/documentRoute');
const authRoute = require('./routes/authRoute');
const imageRoute = require('./routes/imageRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());

app.use('/api/auth', authRoute.routes);
app.use('/api/admin', documentRoute.routes);
app.use('/api/file', imageRoute.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
