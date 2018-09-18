import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../containers/LandingPage';
import HomePage from '../containers/HomePage';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Router >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute isAuthenticated={isAuthenticated} path="/home" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
