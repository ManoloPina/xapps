'use strict';

import HeaderController from './HeaderController';
import UsersController from './UsersController';

class MainController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderController/>
      </div>
    );
  }
}

module.exports = MainController;
