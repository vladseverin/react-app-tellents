import React, { Component } from 'react';
import queryString from 'query-string';
import history from '../utils/history';
import {
  dataExperience,
} from '../utils/data-talents';

class SidebarJobsFilters extends Component {
  state = {
    experience: dataExperience,
  }

  handleInputExperienceChange = (event) => {
    const { experience } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...experience.map(el => el.name === name ? el.value = isClicked : el)
    });

    const sortExpIsSelected = experience
      .filter(el => el.value)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { exp: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['exp'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  render() {
    const { parsed } = this.props;

    console.log(parsed);
    return (
      <React.Fragment>
        {/* EXPERIENCE SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Experience:</div>
          <div className="checkbox-list">
            <div className="checkbox-block col-6">
              <input
                name="intern"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Intern</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                name="junior"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Junior</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                name="senior"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Senior</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                name="expert"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Expert</label>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SidebarJobsFilters;
