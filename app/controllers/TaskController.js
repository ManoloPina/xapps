'use strict';

const Constants = require('../Constants');
const dateFormat = require('dateformat');

class TaskController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.items = [];
  }

  componentDidMount() {

    this.getData().then(data => {
      this.$deleteButton.on('click', this.deleteDoc.bind(this));
      this.$statusButton.on('click', this.changeStatus.bind(this));
    });

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
    this.sendData().then(data => {
      this.getData();
    });
  }

  deleteDoc(event) {
    console.log('sendId');
    let id = $(event.target).data('id');
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Constants.baseUrl}/tasks/${id}`
      })
      .done(result => {
        resolve(result);
      })
      .fail(err => {
        reject(err);
      });
    })
    .then((result) => {
      console.log('Doc removed', result);
      this.getData();
    });
  }

  sendData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Constants.baseUrl}/tasks/store`,
        type: 'post',
        data: {
          task: this.$taskText.val(),
          status: 'Pendente',
          created_date: dateFormat(new Date(), "dd/mm/yyyy")
        }
      })
      .done(data => {
        resolve(data);
      })
      .fail(err => {
        reject(err);
      });
    })
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
    })
    .then(data => {
      let labelClass;
      let items = data.map(item => {
        labelClass = item.status.toLowerCase() == 'pendente' ? 'label  label-warning' : 'label label-success';
        return (
          <tr>
            <td>{parseInt(item._id.toString(), 12)}</td>
            <td>{item.task}</td>
            <td><span className={labelClass} data-id={item._id}>{item.status}</span></td>
            <td>{item.created_date}</td>
            <td>
              <button className="btn btn-danger delete-btn" data-id={item._id}>Deletar</button>
            </td>
          </tr>
        );
      });
      this.setState({items: items});
    });
  }

  changeStatus(event) {

    let id = $(event.target).data('id');
    let status = $(event.target).text().toLowerCase() == 'pendente' ? 'concluído' : 'pendente';

    this.updateData({id: id, status: status}).then(result => {
      this.getData().then(data => {
        $(event.target).text(status);
      });
    });
  }

  updateData(object) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Constants.baseUrl}/tasks/update`,
        data: object,
        type: 'post'
      })
      .done(result => {
        resolve(result);
      })
      .fail(err => {
        reject(err)
      });
    });
  }

  get $storeButoon() {
    return $(this.refs.storeButton);
  }

  get $deleteButton() {
    return $('.delete-btn');
  }

  get $taskText() {
    return $(this.refs.taskText);
  }

  get $statusButton() {
    return $('.label');
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
