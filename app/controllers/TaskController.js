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
      this.setState({items: items});
    });

    console.log('store button', this.$storeButoon);

    this.$storeButoon.on('click', this.createTask.bind(this));
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

  createTask(event) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Constants.baseUrl}/tasks/store`,
        type: 'post',
        data: {
          task: this.$taskText.val(),
          status: 'Pendente',
          created_date: new Date()
        }
      })
      .done(data => {
        console.log(data);
        resolve(data);
      })
      .fail(err => {
        reject(err);
      });
    }).catch(err => {
      console.log(err);
    });
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

  get $storeButoon() {
    return $(this.refs.storeButton);
  }

  get $taskText() {
    return $(this.refs.taskText);
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
            <input type="text" ref="taskText" className="form-control tarefa-text" placeholder="Tarefa..."/>
          </div>

          <div className="form-group col-xs-12 col-sm-2">
            <button className="btn btn-success" ref="storeButton">Cadastrar</button>
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
