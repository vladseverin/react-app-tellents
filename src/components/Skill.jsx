import React, { Component } from 'react';

class Skill extends Component {
  render() {
    const {title} = this.props;
    return (
      <div className='skill-subcat'>
        <div className='skill-block'>
          <div className="skill-block-title">
            {title}
          </div>
          <div className="skill-block-list">
            <div className="checkbox-block">
              <label>
                <input type="checkbox" disabled="disabled"/>
                <span className="checkbox-circle">
                  <span className="icon icon-check-mark"></span>
                </span>
                <span className="checkbox-text ng-binding">Creative Writing</span>
              </label>
            </div>

            <div className="checkbox-block">
              <label>
                <input type="checkbox" disabled="disabled" />
                <span className="checkbox-circle">
                  <span className="icon icon-check-mark"></span>
                </span>
                <span className="checkbox-text ng-binding">Creative Writing</span>
              </label>
            </div>
          </div>
        </div>

        <div className='skill-sub-block'>
          <div className="skill-block-title">
            Skills
          </div>
          <div className="skill-tags-block">
            <div className='skill-tag'>
              3D Animation
            </div>
            <div className='skill-tag'>
              Motion Design
            </div>
          </div>
        </div>

        <div className="skill-block-footer">
          <a href="javascript:void(0);">Delete</a>
          <a href="javascript:void(0);">Edit</a>
        </div>
      </div>
    );
  }
}

export default Skill;
