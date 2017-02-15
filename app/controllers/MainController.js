'use strict';

import HeaderController from './HeaderController';
import UsersController from './UsersController';
import TaskController from './TaskController';

class MainController extends React.Component {
  constructor(props) {
    super(props);
    this.header = new HeaderController();
    this.usersController = new UsersController();
    this.taskController = new TaskController();
    this.state = {};
    this.state.view = <UsersController/>;
  }

  componentDidMount() {
    this.$menu.find('li').on('click', this.setView.bind(this));
  }

  setView(event) {
    let controller = $(event.target).data('view');
    this.setState({view: this[controller].component});
  }

  render() {
    return (
      <div>
        <HeaderController/>
        {this.state.view}
      </div>
    );
  }

  get $menu() {
    return $('.menu');
  }

}

ReactDOM.render(<MainController/>, $('#main-container').get(0));
