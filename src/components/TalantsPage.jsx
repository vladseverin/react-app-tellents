import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../utils/history';
import JobBox from './JobBox';

class Talants extends Component {
  state = {
    isGoing: true,
  }

  componentDidMount() {
    const { getTalents } = this.props;

    getTalents(1, {});
  }

  componentWillUnmount() {
    const { unmountTalents } = this.props;
    unmountTalents();

  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { data } = this.props;
    console.log('send Request', data);
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
      getTalents(meta.next_page, {});
      return null;
    }
    
    console.log('Not more');
  }

  render() {
    const { isGoing } = this.state;
    const { 
      data: {
        meta, 
        users
      }, 
    } = this.props;

    console.log('meta', meta);
    console.log('users', users);
    
    return ( 
      <div className='container-fluid'>  

        <div className="row contant-header">
          <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
            <div className="greating">
              <div className="greating-name">
                Hi 
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
              <button className="btn">
                <span className="text">Relevance</span>
                <span className="icon icon-down-arrow"></span>
              </button>
              <span className="sort-panel-result">Result: {meta.total_count}</span>
            </div>
          </div>
        </div>

        <div className="row main-content">
          <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
            <div className="filter-tellent">
              you
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
