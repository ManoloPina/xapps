'use strict';
const express = require('express');
const path = require('path');
const multer = require('multer');
const Constants = require('./Constants');
const session = require('express-session');
const bodyParser = require('body-parser');
const Connection = require('./models/Connection');

class Server {

  constructor() {
    this.express = new express();
    this.parseUrlencoded = bodyParser.urlencoded({ extended: false });
    this.indexPage = path.join(__dirname, 'views', 'index.ejs');
    this.connection = new Connection();
    this.initialize();
  }

  initialize() {

    this.express.use(session({
      secret: Constants.SECRET_KEY,
      cookie: {maxAge: 60000},
      resave: true,
      saveUninitialized: true
    }));

    this.express.set('view engine', 'ejs');

    this.express.use(express.static(path.join(__dirname, '..', 'vendor')));

    this.express.get('/', (request, response) => {
      response.render(this.indexPage);
    });

    this.express.listen(3000);

  }
}

new Server();
