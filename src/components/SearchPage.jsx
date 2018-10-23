import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import TalentsPage from './TalantsPage';
import JobsPage from './JobsPage';
import PropTypes from 'prop-types';

class SearchPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, 
    dataUser: PropTypes.object.isRequired,
    dataJobs: PropTypes.object.isRequired,
    dataUsers: PropTypes.object.isRequired,
    dataPromotions: PropTypes.object.isRequired,
    skillTags: PropTypes.array.isRequired,
    getTalents: PropTypes.func,
    getJobs: PropTypes.func,
    unmountTalents: PropTypes.func,
    unmountJobs: PropTypes.func,
    getSkills: PropTypes.func,
    getTags: PropTypes.func,
    getPromotions: PropTypes.func,
    addNewJob: PropTypes.func,
  }

  render() {
    const { 
      match,
      dataUser,
      dataJobs,
      dataUsers,
      dataPromotions,
      getTalents,
      getJobs,
      unmountTalents,
      unmountJobs,
      getSkills,
      dataSkills,
      getTags,
      skillTags,
      getPromotions,
      addNewJob,
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
              addNewJob={addNewJob}
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
              addNewJob={addNewJob}
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
