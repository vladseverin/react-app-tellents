import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../containers/LandingPage';
import HomePage from '../containers/HomePage';
import history from '../utils/history';

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    history: {}
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute isAuthenticated={isAuthenticated} path="/home" component={HomePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
