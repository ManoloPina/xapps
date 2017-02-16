'use strict';


class TasksRoute {

  get(resquest, response) {
    this.tasks.findAll().then(docs => {
      response.json(docs);
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
}

module.exports = TasksRoute;
