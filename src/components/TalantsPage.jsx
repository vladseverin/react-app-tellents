import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../utils/history';
import queryString from 'query-string';

import TalentBox from './TalentBox';
import SidebarTalentFilters from './SidebarTalentFilters';

class Talants extends Component {
  state = {
    isGoing: true,
    searchText: '',
    parsed: {},
    dropDownSort: false,
    sort: 'relevance',
    sortName: 'Relevance',
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

  render() {
    const { 
      isGoing, 
      searchText, 
      dropDownSort, 
      sortName, 
      parsed,
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

              <SidebarTalentFilters parsed={parsed}/>
              
            </div>
          </div>

          <div className="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-9">
            <div className="container-fluid job-boxes">
              <div className="flexbox row margin-none">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 padding-none">
                  <div className="job-boxes-wrapper margin-none">
    
                    {
                      users.map(el => (
                        <TalentBox data={el} key={el.id} />
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
