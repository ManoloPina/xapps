'use strict';

class TaskController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container task-container">
        <h1 className="text-primary">Tasks</h1>
        {this.form}
      </div>
    );
  }

  get form() {
    return (
      <div className="row">
        <form className="form-inline">

          <div className="form-group col-xs-12 col-sm-10">
            <input type="text" className="form-control" placeholder="Tarefa..."/>
          </div>

          <div className="form-group col-xs-12 col-sm-2">
            <button className="btn btn-success">Cadastrar</button>
          </div>

        </form>
      </div>
    );
  }

  get component() {
    return <TaskController/>;
  }
}

export default TaskController;
