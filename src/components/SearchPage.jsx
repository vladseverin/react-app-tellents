import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import TalentsPage from './TalantsPage';
import JobsPage from './JobsPage';

class SearchPage extends Component {
  render() {
    const { 
      match,
      dataUser,
      dataJobs,
      dataUsers,
      getTalents,
      getJobs,
      unmountTalents,
    } = this.props;

    return (
      <Switch> 
        <Route 
          path={`${match.url}/talents`}
          render={() => (
            <TalentsPage 
              user={dataUser}
              data={dataUsers}
              getTalents={getTalents}
              unmountTalents={unmountTalents}
            />
          )} 
        />
        <Route 
          path={`${match.url}/jobs`} 
          render={() => (
            <JobsPage 
              user={dataUser}
              data={dataJobs}
              getJobs={getJobs}
            />
          )} 
        />
        <Redirect 
          from={`${match.url}`} 
          to={`${match.url}/talents`} 
        />
      </Switch>
    )
  }
}

export default SearchPage;
