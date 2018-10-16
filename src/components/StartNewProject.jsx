import React, { Component } from 'react';
import $ from 'jquery';

class StartNewProject extends Component {
  state = {
    jobTitle: '',
    jobDescr: '',
    category: '',
    skill_tags: [],
    skillTestTitle: '', 
    skillTestDescr: '',

    selectedSkill: null,
    isOpenDropDown: false,
    searchText: '',
    tags: [],
    createSkillTest: true,
    chooseExistingSkillTest: false,
    radioIsSelected: 'CreateSkillTest'
  }
  
  handleControlInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSelectSkillCategory = (el) => (event) => {
    const { value } = event.target;
  
    this.setState({
      selectedSkill: value,
      category: el,
    });
  }

  handleSelectSubSkillCategory = (element) => (event) => {
    const { category } = this.state;
    const { checked } = event.target;

    if (checked === true) {
      this.setState({
        category: {
          ...category,
          skill_categories: [
            ...category.skill_categories.map(el => el.id === element.id
              ? { ...el, selected: true }
              : el),
          ]
        }
      })
    } else {
      this.setState({
        category: {
          ...category,
          skill_categories: [
            ...category.skill_categories.map(el => el.id === element.id
              ? { ...el, selected: false }
              : el),
          ]
        }
      })
    }
  }

  handleChangeInput = (event) => {
    const { getTags } = this.props;
    const { value } = event.target;

    this.setState({
      searchText: value,
    });

    getTags(value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.skillTags.length === 0) {
      this.setState({
        tags: [],
        isOpenDropDown: false,
      })

      return null;
    }
    this.setState({
      tags: nextProps.skillTags,
      isOpenDropDown: true,
    });
  }

  handleClickOnTag = (el) => {
    const { skill_tags } = this.state;

    this.setState({
      skill_tags: [
        ...skill_tags,
        el
      ],
      isOpenDropDown: false,
      searchText: '',
    })
  }

  handleDeleteTag = (id) => {
    const { skill_tags } = this.state;

    this.setState({
      skill_tags: [
        ...skill_tags.filter(el => el.id !== id)
      ],
    });
  }

  handleRadioChange = (event) => {
    const { name } = event.target;

    this.setState({
      radioIsSelected: name,
    })
  }

  render() {
    const { 
      jobTitle, 
      jobDescr,
      selectedSkill, 
      category, 
      isOpenDropDown, 
      tags, 
      skill_tags,
      skillTestTitle, 
      skillTestDescr,
      radioIsSelected,
    } = this.state;
    const { dataSkills } = this.props;

    const getSkillCategories = selectedSkill && category.skill_categories;

    return (
      <div className="modal fade" id="startNewProject" tabIndex="-1" role="dialog" aria-labelledby="startNewProjectLabel" aria-hidden="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="modal-title" id="startNewProjectLabel">Post a Job</h5>
              <div className="post-job-form">
                <form className="main-project-form">
                  
                  <div className="form-block">
                    <div className="form-block-wrapper">
                      <input onChange={this.handleControlInputChange} value={jobTitle} name="jobTitle" className="job-title form-control has-validate" type="text" placeholder="Job Title" required />
                      <textarea onChange={this.handleControlInputChange} value={jobDescr} name="jobDescr" className="job-descr form-control has-validate" rows="4" placeholder="Job Description" required></textarea>
                    </div>
                  </div>

                  <div className="form-block">
                    <div className="skill-block skill-cat">
                      <div className="skill-block-title">
                        <div className="skill-block-title-wrapper">
                          <span>Choose Your Skill Category</span> 
                          <span className="icon icon-down-arrow"></span>
                        </div>
                      </div>
                      <div className="skill-block-list">
                        {
                          dataSkills && dataSkills.map(el => (
                            <div className="checkbox-block" key={el.id}>
                              <label>
                                <input
                                  onChange={this.handleSelectSkillCategory(el)}
                                  value={el.name}
                                  checked={selectedSkill === el.name}
                                  type="radio" />
                                {el.name}
                              </label>
                            </div>
                            
                          ))
                        }
                      </div>
                      {selectedSkill && (
                        <div className="skill-subcat">
                          <div className="skill-block">
                            <div className="skill-bloxk-title">
                              {selectedSkill && selectedSkill}
                            </div>

                            <div className="sbucat-block-list">
                              {
                                selectedSkill && getSkillCategories.map(el => (
                                  <div className="sbucat-block" key={el.id}>
                                    <label>
                                      <input
                                        onChange={this.handleSelectSubSkillCategory(el)}
                                        value={el.name}
                                        checked={el.selected}
                                        type="checkbox" />
                                      {el.name}
                                    </label>
                                  </div>
                                ))
                              }
                            </div>

                          </div>
                          {
                            selectedSkill && (
                              <div className="skill-sub-block">
                                <div className="wrap-skill-tags">
                                  <div className="skill-tags">
                                    <input
                                      className="search-tags"
                                      type="search"
                                      onChange={this.handleChangeInput}
                                      placeholder="Write new skill"
                                      value={this.state.searchText}
                                    />
                                  </div>

                                  {isOpenDropDown &&
                                    <ul className="list-tags">
                                      {
                                        tags.map(el => (
                                          <li
                                            key={el.id}
                                            onClick={() => this.handleClickOnTag(el)}
                                          >
                                            {el.name}
                                          </li>
                                        ))
                                      }
                                    </ul>
                                  }
                                  <div className="skill-tags-block">
                                    {
                                      skill_tags.length !== 0 &&
                                      skill_tags.map(el => (
                                        <div key={el.id} className='skill-tag'>
                                          {el.name}
                                          <span
                                            className="skill-tag-btn"
                                            onClick={() => this.handleDeleteTag(el.id)}
                                          >x</span>
                                        </div>
                                      ))
                                    }
                                  </div>

                                </div>
                              </div>
                            )
                          }

                        </div>
                      )}


                    </div>
                  </div>

                  <div className="form-block">
                    <div className="form-block-wrapper">
                      <div className="radio-block">
                        <div className="radio">
                          <label>
                            <input 
                              onChange={this.handleRadioChange}
                              name="CreateSkillTest"
                              checked={radioIsSelected === 'CreateSkillTest'}
                              type="radio"
                            />
                            Create Skill Test
                          </label>
                        </div>
                        <input onChange={this.handleControlInputChange} value={skillTestTitle} name="skillTestTitle" className="job-title form-control has-validate" type="text" placeholder="Skill Test Title" required disabled={radioIsSelected === 'CreateSkillTest' ? '' : true}/>
                        <textarea onChange={this.handleControlInputChange} value={skillTestDescr} name="skillTestDescr" className="job-descr form-control has-validate" rows="4" placeholder="Skill Test Description" required disabled={radioIsSelected === 'CreateSkillTest' ? '' : true}></textarea>
                      </div>
                      <div className="radio-block">
                        <div className="radio">
                          <label>
                            <input
                              onChange={this.handleRadioChange}
                              name="ChooseExistingSkill"
                              checked={radioIsSelected === 'ChooseExistingSkill'}
                              type="radio"
                            />
                            or choose existing skill test
                          </label>
                        </div>
                        <input onChange={this.handleControlInputChange} value={skillTestTitle} name="skillTestTitle" className="job-title form-control has-validate" type="text" placeholder="Skill Test Title" required disabled={radioIsSelected === 'ChooseExistingSkill' ? '' : true}/>
                        <textarea onChange={this.handleControlInputChange} value={skillTestDescr} name="skillTestDescr" className="job-descr form-control has-validate" rows="4" placeholder="Skill Test Description" required disabled={radioIsSelected === 'ChooseExistingSkill' ? '' : true}></textarea>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default StartNewProject;
