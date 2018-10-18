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
      unmountJobs,
      getSkills,
      dataSkills,
      getTags,
      skillTags,
      dataPromotions,
      getPromotions,
    } = this.props;

    return (
      <Switch> 
        <Route 
          path={`${match.url}/talents`}
          render={(props) => (
            <TalentsPage 
              user={dataUser}
              data={dataUsers}
              getTalents={getTalents}
              unmountTalents={unmountTalents}
              getSkills={getSkills}
              dataSkills={dataSkills}
              getTags={getTags}
              skillTags={skillTags}
              dataPromotions={dataPromotions}
              getPromotions={getPromotions}
              {...props}
            />
          )} 
        />
        <Route 
          path={`${match.url}/jobs`} 
          render={(props) => (
            <JobsPage 
              user={dataUser}
              data={dataJobs}
              getJobs={getJobs}
              unmountJobs={unmountJobs}
              getSkills={getSkills}
              dataSkills={dataSkills}
              getTags={getTags}
              skillTags={skillTags}
              dataPromotions={dataPromotions}
              getPromotions={getPromotions}
              {...props}
            />
          )} 
        />
        <Redirect 
          from={`${match.url}`} 
          to={`${match.url}/talents`}
          preserveQueryString 
        />
      </Switch>
    )
  }
}

export default SearchPage;
