import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Talants extends Component {
  state = {
    isGoing: true
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
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
            <div className="job-switcher">
              <div className="panel">

                <span className={"panel-radio"}>Jobs</span>
                <label className="switch">
                  <input 
                    name="isGoing"
                    checked={isGoing}
                    type="checkbox" 
                    onChange={this.handleInputChange}/>
                  <span className="slider round"></span>
                </label>
                <span className={"radio-text panel-radio"}>Talants</span>  

              </div>
            </div>
          </div>
          
          <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
            <div className="panel">
              Sort By
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Talants;
