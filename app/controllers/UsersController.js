'use strict';

class UsersController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.data;
    this.state.pagination;
  }

  componentDidMount() {

    this.getData().then(obj => {
      console.log('data', obj);
      return new Promise((resolve, reject) => {
        let element = obj.data.map(item => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.first_name} {item.last_name}</td>
              <td><img src={item.avatar} className="pull-right"/></td>
            </tr>
          );
        });
        resolve(element);
      });
    })
    .then(element => {
      this.$pagination.find('li').on('click', this.changePage.bind(this));
      this.setState({data: element});
    });


  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Id</td>
              <td>Nome</td>
              <td className="text-right">Avatar</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data}
          </tbody>
        </table>

        {this.pagination}

      </div>
    );
  }

  getData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'https://reqres.in/api/users?page=1',
        type: "GET",
      })
      .done(data => {
        resolve(data);
      })
      .fail(err => {
        reject(err);
      });
    })
    .catch(err => {
      console.log(err);
    });


  }

  changePage(event) {
    let index = $(event.target).data('index');

    new Promise((resolve, reject) => {
      $.ajax({
        url: `https://reqres.in/api/users?page=${index}`,
        type: "GET",
      })
      .done(data => {
        resolve(data);
      })
      .fail(err => {
        reject(err);
      });
    })
    .then(obj => {
      return new Promise((resolve, reject) => {

        let element = obj.data.map(item => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.first_name} {item.last_name}</td>
              <td><img src={item.avatar} className="pull-right"/></td>
            </tr>
          );
        });

        resolve(element);

      });
    })
    .then(element => {
      this.setState({data: element});
    });
  }

  get pagination() {

    this.getData().then(data => {
      return new Promise((resolve, reject) => {
        let listNumber = [];
        for(let i = 1; i <= data.total_pages; i++) {
          listNumber.push(i);
        }
        let list = listNumber.map(index => {
          return (
            <li><a data-index={index}>{index}</a></li>
          );
        });
        resolve(list);
      });
    })
    .then(totalPages => {
      this.setState({pagination: totalPages});
    });

    return (
      <nav aria-label="Page navigation" className="center-block" ref="pagination">
        <ul className="pagination">
          <li>
            <a aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
            {this.state.pagination}
          <li>
            <a aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  get $pagination() {
    return $(this.refs.pagination);
  }
}



export default UsersController;
