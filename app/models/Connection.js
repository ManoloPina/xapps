'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Constants = require('../Constants');
const mongoose = require('mongoose');

class Connection {
  constructor() {
    this.mongoose = mongoose;
  }

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(`${Constants.DB_PATH}`, (err, db) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        resolve(db);
      });
    });
  }

  insertOne(collection, object) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).insertOne(object, (err, result) => {
          result ? resolve(result) : reject(err);
        });
      });
    });
  }

  find(collection, query, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).find(query).sort(sortObject).toArray((err, docs) => {
          err ? reject(err) : resolve(docs);
        });
      });
    });
  }

  removeDocument(collection, query) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).deleteOne(query, (err, result) => {
          result ? resolve(result) : reject(err);
        });
      });
    });
  }

  updateDocument(collection, query, object) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).updateOne(query, {$set: object}, (err, result) => {
          result ? resolve(result) : reject(err);
        });
      });
    });
  }

  result(err, result) {
    assert.equal(null, err);
    assert.equal(1,result.insertedCount);
  }

}

module.exports = Connection;
