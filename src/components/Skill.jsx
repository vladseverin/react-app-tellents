import React, { Component } from 'react';

class Skill extends Component {
  handleClickDelete = (event) => {
    event.preventDefault();
    const { handleClickDelete } = this.props;

    handleClickDelete();
  }

  handleClickEdit = (event) => {
    event.preventDefault();
    const { handleClickEdit } = this.props;

    handleClickEdit();
  }

  render() {
    const { title, skillCategories, skillTags} = this.props;

    const filterCategories = skillCategories.filter(element => element.selected === true);

    return (
      <div className='skill-subcat'>
        <div className='skill-block'>
          <div className="skill-block-title">
            {title}
          </div>
          <div className="skill-block-list">

            {
              filterCategories.map(element => {
                return (
                  <div key={element.id} className="checkbox-block">
                    <label>
                      <input type="checkbox" disabled="disabled" />
                      <span className="checkbox-circle">
                        <span className="icon icon-check-mark"></span>
                      </span>
                      <span className="checkbox-text ng-binding">{element.name}</span>
                    </label>
                  </div>
                );
              })
            }

          </div>
        </div>

        <div className='skill-sub-block'>
          <div className="skill-block-title">
            Skills
          </div>
          <div className="skill-tags-block">
            {
              skillTags.map(element => {
                return (
                  <div key={element.id} className='skill-tag'>
                    {element.name}
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className="skill-block-footer">
          <a  
            onClick={this.handleClickDelete}>Delete</a>
          <a
            onClick={this.handleClickEdit}>Edit</a>
        </div>
      </div>
    );
  }
}

export default Skill;
