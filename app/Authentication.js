'use strict';

const path = require('path');
const Connection = require('./models/Connection');

class Authentication extends Connection {

  authenticate(request, response, next) {
    if(!request.session.userId) {
      if(request.url !== '/authenticate') {
        response.render(path.join(__dirname, 'views', 'authentication.ejs'));
      }
    }
    next();
  }

  post(request, response) {
    response.status(201).json(request.body);
  }

}

module.exports = Authentication;
