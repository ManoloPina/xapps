'use strict';


 class HeaderController extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" href="#">x.apps</a>
          </div>

          <ul className="nav navbar-nav menu">
           <li><a data-view="usersController">Users</a></li>
           <li><a data-view="taskController">Tasks</a></li>
          </ul>

        </div>
      </nav>
    );
  }

}

export default HeaderController;
