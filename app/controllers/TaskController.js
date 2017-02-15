'use strict';

const Constants = require('../Constants');

class TaskController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.items = [];
  }

  componentDidMount() {
    this.getData().then(data => {
      console.log(data);
      return new Promise((resolve, reject) => {
        let items = data.map(item => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.task}</td>
              <td>{item.status}</td>
              <td>{item.created_date}</td>
              <td>
                <button className="btn btn-danger" data-id={item._id}>Deletar</button>
              </td>
            </tr>
          );
        });
        resolve(items);
      });
    })
    .then(items => {
      console.log('items', items);
      this.setState({items: items});
      console.log(this.state.items);
    });
  }

  render() {
    return (
      <div className="container task-container">
        <h1 className="text-primary">Tasks</h1>
        {this.form}
        {this.listTask}
      </div>
    );
  }

  createTask() {

  }

  getData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Constants.baseUrl}/tasks`
      })
      .done(data => {
        resolve(data);
      })
      .fail(err => {
        reject(err);
      });
    });
  }

  get listTask() {

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <td>id</td>
            <td>tarefa</td>
            <td>status</td>
            <td>criado em</td>
            <td>ação</td>
          </tr>
        </thead>
        <tbody>
          {this.state.items}
        </tbody>
      </table>
    );
  }

  get form() {
    return (
      <div className="row">
        <form className="form-inline">

          <div className="form-group col-xs-12 col-sm-10">
            <input type="text" className="form-control tarefa-text" placeholder="Tarefa..." nome="manolo"/>
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
