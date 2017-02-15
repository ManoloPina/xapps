'use strict';

const Connection = require('./Connection');

class Tasks extends Connection {
  constructor() {
    super();
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.find('tasks', {}).then(docs => {
        resolve(docs);
      });
    });
  }


}

module.exports = Tasks;
