import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LandingPage from '../containers/LandingPage';
import HomePage from '../containers/HomePage';

class App extends Component {
  render() {
    const { isAuthenticated} = this.props;
    console.log(isAuthenticated);
    return (
      <Router >
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> */}
          {/* <Route path="/home" component={HomePage} />

          <Route path='/home' render={() => isAuthenticated 
            ? <Redirect to="/home" />
            : <Redirect to="/" />
          } /> */}
          <Route 
            exact 
            path="/" 
            render={() => isAuthenticated
              ? <HomePage />
              : <LandingPage />} 
          />

          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
