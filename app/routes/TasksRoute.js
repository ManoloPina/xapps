'use strict';

const mongodb = require('mongodb');

class TasksRoute {

  get(resquest, response) {
    this.tasks.findAll({}, {status: -1, created_date: 1}).then(docs => {
      response.json(docs);
    });
  }

  delete(request, response) {
    this.tasks.delete({_id: new mongodb.ObjectID(request.params.id)}).then(result => {
      response.json(result).status(200);
    });
  }

  post(request, response) {
    this.tasks.insert(request.body).then(result => {
      response.json(result);
    })
    .catch(err => {
      response.json(err);
    });
  }

  update(request, response) {

    let id = request.body.id;
    let status = request.body.status;

    this.tasks.update({_id: new mongodb.ObjectID(id)}, {status: status})
    .then(result => {
      console.log(`Document _id: ${id} updated`, result);
      response.json(result).status(200);
    })
    .catch(err => {
      console.log(`Não foi possível atualizar o documento de _id: ${id}, erro: ${err}`);
    });

  }
}

module.exports = TasksRoute;
