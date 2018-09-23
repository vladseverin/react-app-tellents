import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Jobs extends Component {
  render() {
    return (
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
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
      </div>
    );
  }
}

export default withRouter(Jobs);
