'use strict';

class HeaderController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Trio Energia ERP</a>
          </div>
        </div>
      </nav>

    );
  }

  authenticatedView() {
    return (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="active">
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
        </ul>
        <form className="navbar-form navbar-right">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"/></div>
        </form>
      </div>
    );
  }
}

export default HeaderController;
