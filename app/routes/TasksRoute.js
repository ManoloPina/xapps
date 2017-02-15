'use strict';


class TasksRoute {

  get(resquest, response) {
    this.tasks.findAll().then(docs => {
      response.json(docs);
    });
  }
}

module.exports = TasksRoute;
