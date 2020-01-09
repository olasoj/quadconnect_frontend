import React, { Fragment, Component } from 'react';
import './App.css';

//packages
import { Route, Redirect, Switch } from 'react-router-dom';

//component
import NavBar from './component/NavBar';
import { Home } from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Logout from './component/LogOut';

//common
import NotFound from './common/NotFound';
import ProtectedRoute from './common/ProtectedRoute';

//services
import auth from './services/authServices.js';

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <NavBar user={user} />
        <div className='container '>
          <Switch>
            <Route
              path='/home'
              render={props => <Home {...props} user={user} />}
            />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={Register} />
            <Redirect exact from='/' to='/home' />
            <Route path='/not-found' component={NotFound} />

            <Redirect to='/not-found' />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default App;
