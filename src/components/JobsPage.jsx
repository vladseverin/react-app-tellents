import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Jobs extends Component {
  state = {
    isGoing: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { isGoing } = this.state;
    
    return (
      <div className='container-fluid'>

        <div className="row contant-header">
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
            Talants
            <div className="greating">
              <div className="greating-name">
                Hi
              </div>
              <div className="greating-text">
                WHAT ARE YOU LOOKING FOR TODAY?
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
            <div className="search-form">
              <form
                className="my-form-search"
                onKeyDown={this.onKeyPressed}
                onSubmit={this.handleSubmit}>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Search for ..."
                />

                <div className="search-filter">
                  <Link
                    to={`/home/find/jobs`}
                    name="jobs"
                    onClick={this.handleChangeFilter}
                    className={"serch-filter-item radio-text"}>
                    Jobs
                  </Link>
                  <Link
                    to={`/home/find/talents`}
                    name="jobs"
                    onClick={this.handleChangeFilter}
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
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
            <div className="job-switcher">
              <div className="panel">

                <span className={"panel-radio radio-text"}>Jobs</span>
                <label className="switch">
                  <input
                    name="isGoing"
                    checked={isGoing}
                    type="checkbox"
                    onChange={this.handleInputChange} />
                  <span className="slider round"></span>
                </label>
                <span className={"panel-radio"}>Talants</span>

              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
            <div className="panel">
              Sort By
            </div>
          </div>
        </div>

        {/* <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
          <div className="panel jobs-wrap">

            <div className="filter-block">
              <div className='filter-title'>Experience:</div>

              <div className="checkbox-list row">
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> Intern</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> Senior</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> Junior</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> Expert</label>
                </div>
              </div>
            </div>

            <div className="filter-block">
              <div className='filter-title'>Posted:</div>

              <div className="checkbox-list row">
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> 24h</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> 3d</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> 1w</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> > 1w</label>
                </div>
              </div>
            </div>

            <div className="filter-block">
              <div className='filter-title'>Place:</div>

              <div className="checkbox-list row">
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> On-line</label>
                </div>
                <div className="checkbox-block col-6">
                  <input className="checkbox-block-item" type="checkbox" />
                  <label className="checkbox-block-text"> On-site</label>
                </div>
              </div>
            </div>
            

          </div>
        </div> */}
      </div>
    );
  }
}

export default Jobs;
