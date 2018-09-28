import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import TalentsPage from './TalantsPage';
import JobsPage from './JobsPage';

class SearchPage extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch> 
        <Route path={`${match.url}/talents`} render={() => <TalentsPage />} />
        <Route path={`${match.url}/jobs`} render={() => <JobsPage />} />
        <Redirect from={`${match.url}`} to={`${match.url}/talents`} />
      </Switch>
    )
  }
}

export default SearchPage;
