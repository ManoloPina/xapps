'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Constants = require('../Constants');

class Connection {
  constructor() {

  }

  connect() {
    return new Promise((resolve, reject) => {
      console.log('url', Constants.DB_PATH);
      MongoClient.connect(`${Constants.DB_PATH}`, (err, db) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        resolve(db);
      });
    });
  }

  insert(collection, object) {
    return new Promise((resolve, reject) => {
      this.connect()
      .then(db => {
        db.collection(collection).insertOne(object, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    });

  }

  find(collection, query) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).find(query).toArray((err, docs) => {
          err ? reject(err) : resolve(docs);
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
