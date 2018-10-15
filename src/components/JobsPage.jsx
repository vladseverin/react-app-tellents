import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../utils/history';
import queryString from 'query-string';
import JobBox from './JobBox';
import SidebarJobsFilters from './SidebarJobsFilters';
import noresult from '../img/2695f284d4f5795cff24f0dcb0320358.png';

class Jobs extends Component {
  state = {
    isGoing: false,
    searchText: '',
    parsed: {},
    dropDownSort: false,
    sort: 'relevance',
    sortName: 'Relevance',
  }

  componentWillMount() {
    const { getJobs } = this.props;
    const parsed = queryString.parse(this.props.location.search);

    getJobs(1, parsed, true);
  }

  componentWillUnmount() {
    const { unmountJobs } = this.props;
    unmountJobs();
  }

  handleChangeLocation = () => {
    history.push('/home/find/talents');
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
    const { data } = this.props;

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
    const { getJobs } = this.props;

    if (nextProps.location.search !== this.props.location.search) {
      const parsed = queryString.parse(nextProps.location.search);

      this.setState({ parsed });
      getJobs(1, parsed, true);
    }
  }

  handleButtonLoaadMore = (event) => {
    event.preventDefault();
    const {
      data: {
        meta,
        jobs,
      },
      getJobs,
    } = this.props;

    if (meta.total_count > jobs.length) {
      getJobs(meta.next_page, this.state.parsed);
      return null;
    }

    console.log('Not more');
  }

  handleDropDownSort = () => {
    const { dropDownSort } = this.state;
    this.setState({
      dropDownSort: !dropDownSort,
    });
  }

  handleClickRadioItem = (event) => {
    const { textContent } = event.target;

    if (textContent === 'Newest') {
      this.setState({
        sort: 'newest',
        sortName: 'Newest'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'newest' })),
      });
    }

    if (textContent === 'Highest budget') {
      this.setState({
        sort: 'budget',
        sortName: 'Highest budget'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'budget' })),
      });
    }

    if (textContent === 'Relevance') {
      this.setState({
        sort: 'relevance',
        sortName: 'Relevance'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'relevance' })),
      });
    }

    if (textContent === 'Long term') {
      this.setState({
        sort: 'longterm',
        sortName: 'Long term'
      });
      history.push({
        search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), { sort: 'longterm' })),
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
        jobs
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
                    className={"serch-filter-item radio-text"}>
                    Jobs
                  </Link>
                  <Link
                    to={`/home/find/talents`}
                    className={"serch-filter-item "}>
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

                <span className={"panel-radio radio-text"}>Jobs</span>
                <label className="switch">
                  <input
                    name="isGoing"
                    checked={isGoing}
                    type="checkbox"
                    onChange={this.handleChangeLocation} />
                  <span className="slider round"></span>
                </label>
                <span className={"panel-radio"}>Talants</span>

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
                        >Newest</div>
                        <div
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Highest budget</div>
                        <div
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Relevance</div>
                        <div
                          onClick={this.handleClickRadioItem}
                          className="radio-block-item"
                        >Long term</div>
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
              <SidebarJobsFilters parsed={parsed} />
            </div>
          </div>

          <div className="col-12 col-sm-7 col-md-8 col-lg-9 col-xl-9">
            <div className="container-fluid job-boxes">
              <div className="flexbox row margin-none">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 padding-none">
                  {jobs.length !== 0 
                  ? <React.Fragment>
                      <div className="job-boxes-wrapper margin-none">
                        {
                          jobs
                            .reduce((obj, e1) => {
                              const matches = obj.filter(e2 => e1.id === e2.id);
                              matches.length === 0 ? obj.push(e1) : null;
                              return obj;
                            }, [])
                            .reduce((obj, e1) => {
                              const matches = obj.filter(e2 => e1.title === e2.title);
                              matches.length === 0 ? obj.push(e1) : null;
                              return obj;
                            }, [])
                            .map(el => {
                              return (
                                <JobBox data={el} key={el.id} />
                              );
                            })
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
                      </React.Fragment>
                    : <div className="noresults">
                        <img src={noresult} />
                        <h2 className="blue-color">We didn’t find any job</h2>
                        <p>Please try modifying your search to get more results.</p>
                      </div>
                  }
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

export default Jobs;
