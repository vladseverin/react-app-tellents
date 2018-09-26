import React, { Component } from 'react';
import axios from 'axios';

class SubSkillsAdd extends Component {
  state = {
    arr: [],
    skillsTag: [],
    isOpen: false,

    userSkills: [],
  }

  componentWillMount() {
    const { dataUserSkills } = this.props;

    this.setState({ userSkills: dataUserSkills});
  }

  handleOptionChange = (id) => {
    const { selectedId } = this.props;
    const { userSkills } = this.state;

    // обрабатываем чекед и добавлем в локальный state
    const newArrayData = userSkills
      .map(el => el.id === selectedId
        ? {
            ...el,
            skill_categories: el.skill_categories
              .map(sub => sub.id === id 
                ? { ...sub, selected: !sub.selected}
                : sub
              )
          }
        : el);

    this.setState({ userSkills: newArrayData });

    console.log('new arr', newArrayData);
  }
  
  render() {
    const { selectedId } = this.props;
    const { userSkills } = this.state;

    // console.log('из сабскилс', dataUserSkills);
    // console.log('ID из сабскилс', selectedId);
    const selectedSkill = userSkills
      .filter(el => el.id === selectedId);

    const title = selectedSkill.map(el => el.name)[0];
    const categories = selectedSkill[0].skill_categories;

    return (
      <div className="skill-list-block">
        <div className="skill-list-title">
          {title}
        </div>

        <div className="skill-list-body">
          <form onSubmit={this.handleFormSubmit}>
            <div className="radio-wrap">
              {
                categories.map(el => (
                  <div className="radio" key={el.id} >
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => this.handleOptionChange(el.id)}
                        checked={el.selected}
                        
                      />
                      <span className='checkbox-text'>
                        {el.name}
                      </span>
                    </label>
                  </div>
                ))
              }  

            </div>
            <div className="skill-tags">
              <input className="search-tags" type="search" 
              // onChange={this.handleAddTag} 
              placeholder="Write new skill"/>
            </div>

          </form>
        </div>

      </div>
    );
  }
}

export default SubSkillsAdd;
