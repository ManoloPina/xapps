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

  insert(object) {
    return new Promise((resolve, reject) => {
      this.insert('tasks', object).then(result => {
        resolve(reject);
      });
    });
  }


}

module.exports = Tasks;
