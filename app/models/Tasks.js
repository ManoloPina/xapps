'use strict';

const Connection = require('./Connection');

class Tasks extends Connection {

  constructor() {
    super();
    this.collection = 'tasks';
  }

  delete(query) {
    return new Promise((resolve, reject) => {
      this.removeDocument(this.collection, query).then(result => {
        resolve(result);
      })
      .catch(err => {
        console.log('err', err);
      });
    });
  }

  findAll(query = {}, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.find(this.collection, query, sortObject).then(docs => {
        resolve(docs);
      });
    });
  }

  insert(object) {
    return new Promise((resolve, reject) => {
      this.insertOne('tasks', object).then(result => {
        resolve(result);
      });
    });
  }

  update(query, object) {
    return new Promise((resolve, reject) => {
      this.updateDocument(this.collection, query, object).then(result => {
        resolve(result);
      });
    });
  }


}

module.exports = Tasks;
