import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../utils/history';
import JobBox from './JobBox';
import queryString from 'query-string';

class Talants extends Component {
  state = {
    isGoing: true,
    searchText: '',
    parsed: {},
    dropDownSort: false,
    sort: 'relevance',
    sortName: 'Relevance',
    experience: [
      { name: 'intern', value: false },
      { name: 'senior', value: false },
      { name: 'junior', value: false },
      { name: 'expert', value: false },
    ],  
    doneSuccess: '',
    skillScore: '',
    frilancerRate: '',
  }

  componentWillMount() {
    const { getTalents } = this.props;
    const parsed = queryString.parse(this.props.location.search);

    getTalents(1, parsed, true);
  }

  componentWillUnmount() {
    const { unmountTalents } = this.props;
    unmountTalents();
  }

  handleChangeLocation = () => {
    history.push('/home/find/jobs');
  }

  handleButtonLoaadMore = (event) => {
    event.preventDefault();
    const { 
      data: {
        meta,
        users,
      },
      getTalents,
    } = this.props;

    if (meta.total_count > users.length) {
      getTalents(meta.next_page, this.state.parsed);
      return null;
    }
    
    console.log('Not more');
  }

  handleChangeSearchText = (event) => {
    const { value } = event.target;
    this.setState({
      searchText: value,
    });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { searchText, parsed } = this.state;

    if (!searchText) {
      delete parsed['q'];
      history.push({
        search: queryString.stringify(parsed),
      });

      return null;
    };

    history.push({
      search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { q: searchText })),
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { getTalents } = this.props;

    if (nextProps.location.search !== this.props.location.search) {
      const parsed = queryString.parse(nextProps.location.search);

      this.setState({ parsed });
      getTalents(1, parsed, true);
    } 

  }

  handleDropDownSort = () => {
    const { dropDownSort } = this.state;
    this.setState({ 
      dropDownSort: !dropDownSort,
    });
  }

  handleClickRadioItem = (event) => {
    const { textContent } = event.target;

    if (textContent === 'Relevance') {
      this.setState({
        sort: 'relevance',
        sortName: 'Relevance'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'relevance' })),
      });
    }

    if (textContent === 'Most saved') {
      this.setState({
        sort: 'saved',
        sortName: 'Most saved'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'saved' })),
      });
    }

    if (textContent === 'Highest Score') {
      this.setState({
        sort: 'rate',
        sortName: 'Highest Score'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'rate' })),
      });
    }

    if (textContent === 'Most Hired') {
      this.setState({
        sort: 'hired',
        sortName: 'Most Hired'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'hired' })),
      });
    } 
  }

  handleInputExperienceChange = (event) => {
    const { parsed, experience } = this.state;
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
    const { value, checked } = event.target;
    const { doneSuccess, parsed } = this.state;

    if ( doneSuccess === value) {
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
    const { value, checked } = event.target;
    const { skillScore, parsed } = this.state;

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
    const { value, checked } = event.target;
    const { frilancerRate, parsed } = this.state;

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

  render() {
    const { 
      isGoing, 
      searchText, 
      dropDownSort, 
      sortName, 
      doneSuccess,
      skillScore,
      frilancerRate,
    } = this.state;

    const { 
      user,
      data: {
        meta, 
        users
      }, 
    } = this.props;
    
    return ( 
      <div className='container-fluid'>  

        <div className="row contant-header">
          <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
            <div className="greating">
              <div className="greating-name">
                {`Hi ${user.firstName} ${user.lastName}`}
              </div>
              <div className="greating-text">
                WHAT ARE YOU LOOKING FOR TODAY?
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-9">
            <div className="search-form">
              <form 
                className="my-form-search" 
                onKeyDown={this.onKeyPressed}  
                onSubmit={this.handleSubmitForm}>

                <input
                  value={searchText}
                  onChange={this.handleChangeSearchText}
                  className="form-control"
                  type="text"
                  placeholder="Search for ..."
                />

                <div className="search-filter">
                  <Link
                    to={`/home/find/jobs`}
                    className={"serch-filter-item "}>
                    Jobs
                  </Link>
                  <Link
                    to={`/home/find/talents`}
                    className={"serch-filter-item radio-text"}>
                    Talants
                  </Link>
                </div>

                <button type="submit" className="btn-search">
                  <i className="icon icon-loupe"></i>
                </button>

              </form>
            </div>
          </div>
        </div>

        <div className="row contant-body">
          <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
            <div className="job-switcher">
              <div className="panel">
        
                <span className="panel-radio">Jobs</span>
                <label className="switch">
                  <input 
                    name="isGoing"
                    checked={isGoing}
                    type="checkbox" 
                    onChange={this.handleChangeLocation}/>
                  <span className="slider round"></span>
                </label>
                <span className={"radio-text panel-radio"}>Talants</span>  

              </div>
            </div>
          </div>
          
          <div className="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-9">
            <div className="sort-panel">
              <span className="sort-panel-text">Sort By</span>
              <button 
                className="btn" 
                onClick={this.handleDropDownSort}
              >
                <span className="text">{sortName}</span>
                <span className="icon icon-down-arrow"></span>
                {
                  dropDownSort 
                  ? <div className="drop-down-sort">
                      <div className="caret-block">
                        <span className="caret-top"></span>
                      </div>
                      <div className="radio-block">
                        <div 
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Relevance</div>
                        <div 
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Most saved</div>
                        <div 
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Highest Score</div>
                        <div
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Most Hired</div>
                      </div>
                    </div>
                  : null
                } 
              </button>
              <span className="sort-panel-result">Result: {meta.total_count}</span>
            </div>
          </div>
        </div>

        <div className="row main-content">
          <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
            <div className="wrap-filter-block">
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

            </div>
          </div>

          <div className="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-9">
            <div className="container-fluid job-boxes">
              <div className="flexbox row margin-none">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 padding-none">
                  <div className="job-boxes-wrapper margin-none">
                    
                    {
                      users.map(el => (
                        <JobBox data={el} key={el.id} />
                      ))
                    }
                  
                  </div>
                  <div className="load-more">
                    <a 
                      className="btn load-more-btn" 
                      href="javascript:void(0)"
                      onClick={this.handleButtonLoaadMore}>
                      Load More
                    </a>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 padding-none-right">
                  <button className="button-box" >Start new project</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Talants;
