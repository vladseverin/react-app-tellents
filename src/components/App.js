import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LandingPage from './LandingPage';
import HomePage from './HomePage';

class App extends Component {
  render() {
    return (
      <Router >
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
