import React, { Component } from 'react';
import queryString from 'query-string';
import history from '../utils/history';
import { 
  dataExperience, 
  dataLocations,
  dataLanguages, 
  dataAvailability,
  dataPlaceOfWork
} from '../utils/data-talents';

class SidebarTalentFilters extends Component {
  state = {
    doneSuccess: '',
    skillScore: '',
    frilancerRate: '',
    isPressContry: false,
    isPressLanguage: false,
    experience: dataExperience,
    locations: dataLocations,
    languages: dataLanguages,
    availability: dataAvailability,
    placeOfWork: dataPlaceOfWork,
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

  handleDoneSuccessChange = (event) => {
    const { doneSuccess } = this.state;
    const { parsed } = this.props;
    const { value, checked } = event.target;

    if (doneSuccess === value) {
      this.setState({ doneSuccess: '' });
    } else {
      this.setState({ doneSuccess: value });
    };


    if (checked) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { ds: value }))
      });
    } else {
      delete parsed['ds'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleSkillTestScoreChange = (event) => {
    const { skillScore } = this.state;
    const { parsed } = this.props;
    const { value, checked } = event.target;

    if (skillScore === value) {
      this.setState({ skillScore: '' });
    } else {
      this.setState({ skillScore: value });
    };

    if (checked) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { skill: value }))
      });
    } else {
      delete parsed['skill'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleFrilancerRateChange = (event) => {
    const { frilancerRate } = this.state;
    const { parsed } = this.props;
    const { value, checked } = event.target;

    if (frilancerRate === value) {
      this.setState({ frilancerRate: '' });
    } else {
      this.setState({ frilancerRate: value });
    };

    if (checked) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { rate: value }))
      });
    } else {
      delete parsed['rate'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleLocationChange = (event) => {
    const { locations } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;

    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...locations.map(el => el.name === name ? el.selected = isClicked : el)
    });

    const sortLocationIsSelected = locations
      .filter(el => el.selected)
      .map(el => el.name);

    if (sortLocationIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { loc: sortLocationIsSelected.join(',') })),
      });
    } else {
      delete parsed['loc'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleLanguageChange = (event) => {
    const { languages } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;

    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...languages.map(el => el.name === name ? el.selected = isClicked : el)
    });

    const sortLanguagesIsSelected = languages
      .filter(el => el.selected)
      .map(el => el.name);

    if (sortLanguagesIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { lang: sortLanguagesIsSelected.join(',') })),
      });
    } else {
      delete parsed['lang'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleAvailabilityChange = (event) => {
    const { availability } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...availability.map(el => el.name === name ? el.value = isClicked : el)
    });

    const sortExpIsSelected = availability
      .filter(el => el.value)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { avl: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['avl'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handlePlaceOfWorkChange = (event) => {
    const { placeOfWork } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...placeOfWork.map(el => el.name === name ? el.value = isClicked : el)
    });

    const sortExpIsSelected = placeOfWork
      .filter(el => el.value)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { place: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['place'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  render() {
    const {
      doneSuccess,
      skillScore,
      frilancerRate,
      isPressContry,
      locations,
      isPressLanguage,
      languages,
      availability,
      placeOfWork
    } = this.state;

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

        {/* Job Done Success SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Job Done Success:</div>
          <div className="checkbox-list">
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_100"
                checked={doneSuccess === 'i_100' ? true : false}
                onChange={this.handleDoneSuccessChange}
              />
              <label className="checkbox-block-text"> 100%</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="m_95"
                checked={doneSuccess === 'm_95'}
                onChange={this.handleDoneSuccessChange}
              />
              <label className="checkbox-block-text"> > 95%</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_85_95"
                checked={doneSuccess === 'i_85_95'}
                onChange={this.handleDoneSuccessChange}
              />
              <label className="checkbox-block-text"> 85-95%</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="l_85s"
                checked={doneSuccess === 'l_85s'}
                onChange={this.handleDoneSuccessChange}
              />
              <label className="checkbox-block-text"> {'< 85%'} </label>
            </div>
          </div>
        </div>

        {/* Skill Test Score SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Skill Test Score:</div>
          <div className="checkbox-list">
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_5"
                checked={skillScore === 'i_5' ? true : false}
                onChange={this.handleSkillTestScoreChange}
              />
              <label className="checkbox-block-text"> Best (5)</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_5_4"
                checked={skillScore === 'i_5_4' ? true : false}
                onChange={this.handleSkillTestScoreChange}
              />
              <label className="checkbox-block-text"> 5-4.6</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_4"
                checked={skillScore === 'i_4' ? true : false}
                onChange={this.handleSkillTestScoreChange}
              />
              <label className="checkbox-block-text"> 4.6-4</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="l_4"
                checked={skillScore === 'l_4' ? true : false}
                onChange={this.handleSkillTestScoreChange}
              />
              <label className="checkbox-block-text"> {'< 4'} </label>
            </div>
          </div>
        </div>

        {/* Freelancer Rate SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Freelancer Rate:</div>
          <div className="checkbox-list">
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_5"
                checked={frilancerRate === 'i_5' ? true : false}
                onChange={this.handleFrilancerRateChange}
              />
              <label className="checkbox-block-text"> Best (5)</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_5_4"
                checked={frilancerRate === 'i_5_4' ? true : false}
                onChange={this.handleFrilancerRateChange}
              />
              <label className="checkbox-block-text"> 5-4.8</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i_4"
                checked={frilancerRate === 'i_4' ? true : false}
                onChange={this.handleFrilancerRateChange}
              />
              <label className="checkbox-block-text"> 4.8-4.5</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="l_4"
                checked={frilancerRate === 'l_4' ? true : false}
                onChange={this.handleFrilancerRateChange}
              />
              <label className="checkbox-block-text"> {'< 4.5'} </label>
            </div>
          </div>
        </div>
      
        {/* Location SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Location:</div>

          <div className="filter-dropdown-block col-12">
            <button 
              className="btn dropdown-toggle-btn" 
              type="button"
              onClick={() => this.setState({isPressContry: !isPressContry})}  
            >
              <div className="btn-inner">
                <span className="text">Contry (All)</span>
                <span className="icon icon-down-arrow"></span>
              </div>
            </button>

            {isPressContry && <div className="dropdown-list">
              <div className="caret-block">
                <span className="caret-top"></span>
              </div>

              <div className="dropdown-list-wrapper">
                <div className="checkbox-list-block">
                  {
                    locations
                      .map((el, id) => (
                        <div className="checkbox-block" key={id}>
                          <label className="chekbox-item">
                            <input 
                              type="checkbox"
                              name={el.name}
                              onChange={this.handleLocationChange}
                            />
                            <span className="name">{el.name}</span>
                          </label>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>}
          </div>

        </div>
      
        {/* Languages SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Languages:</div>

          <div className="filter-dropdown-block col-12">
            <button
              className="btn dropdown-toggle-btn"
              type="button"
              onClick={() => this.setState({ isPressLanguage: !isPressLanguage })}
            >
              <div className="btn-inner">
                <span className="text">Languages (All)</span>
                <span className="icon icon-down-arrow"></span>
              </div>
            </button>

            {isPressLanguage && <div className="dropdown-list">
              <div className="caret-block">
                <span className="caret-top"></span>
              </div>

              <div className="dropdown-list-wrapper">
                <div className="checkbox-list-block">
                  {
                    languages
                      .map((el, id) => (
                        <div className="checkbox-block" key={id}>
                          <label className="chekbox-item">
                            <input
                              type="checkbox"
                              name={el.name}
                              onChange={this.handleLanguageChange}
                            />
                            <span className="name">{el.name}</span>
                          </label>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>}
          </div>

        </div>
      
        {/* Availability SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Availability:</div>
          <div className="checkbox-list">
            {
              availability.map((el, id) => (
                <div className="checkbox-block col-6" key={id}>
                  <input
                    name={el.name}
                    onChange={this.handleAvailabilityChange}
                    className="checkbox-block-item"
                    type="checkbox"
                  />
                  <label className="checkbox-block-text">{el.text}</label>
                </div>
              ))
            }
          </div>
        </div>

        {/* Place Work SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Place of Work:</div>
          <div className="checkbox-list">
            {
              placeOfWork.map((el, id) => (
                <div className="checkbox-block col-6" key={id}>
                  <input
                    name={el.name}
                    onChange={this.handlePlaceOfWorkChange}
                    className="checkbox-block-item"
                    type="checkbox"
                  />
                  <label className="checkbox-block-text">{el.text}</label>
                </div>
              ))
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SidebarTalentFilters;
