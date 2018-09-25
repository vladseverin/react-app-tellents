import React, { Component } from 'react';
import Skill from './Skill';
import SkillAdd from './SkillAdd';
import SubSkillsAdd from './SubSkillsAdd';

import { data } from '../utils/data.js';

class SkillsPage extends Component {
  state = {
    activeTab: 0,
    isActiveAdd: false,
    nextStap: false,
    skills: {
      mainSkill: null,
    },
    mainData: [],
  }

  componentDidMount(){
    const { getSkills } = this.props;

    getSkills();
  }

  handleTabChange = (value) => {
    this.setState({ activeTab: value });
  };

  handleAddClick = (event) => {
    this.setState({
      isActiveAdd: true,
    })
  }

  handleBackClick = (event) => {
    const { nextStap } = this.state;
    if (nextStap === true) {
      this.setState({
        nextStap: false,
      })

      return null;
    }

    this.setState({
      isActiveAdd: false,
      skills: {
        mainSkill: null,
        subSkills: [],
        tags: [],
      }
    })
  }

  handleChangeStap = (mainSkill) => {
    this.setState({
      nextStap: true,
      skills: {
        mainSkill,
      }
    });
  }
 
  handleButtonDone = (data) => {
    console.log('Skills', this.state.skills);
    console.log('SubSkills', data);

    this.setState({
      ...this.state,
      isActiveAdd: false,
      nextStap: false,
      skills: {
        mainSkill: null,
      },
      mainData: [
        {name: this.state.skills, subSkills: data}
      ]
    });
  }

  render() {
    const { activeTab, isActiveAdd, nextStap } = this.state;
    const { userSkills } = this.props;

    const filterSelectedElements = userSkills.filter(element => element.selected === true);

    return (
      <div className="container-fluid">
        <div className="skills">
          <div className="flexbox">

            <div className="right-col">
              <ul className="nav my-sidebar">
                <li className={activeTab === 0 ? "nav-item active" : "nav-item" } >
                  <a href="javascript:void(0)" onClick={() => this.handleTabChange(0)}>
                    <span className="icon icon-skills"></span>
                    My Skills
                  </a>
                </li>
                <li className={activeTab === 1 ? "nav-item active" : "nav-item"}>
                  <a href="javascript:void(0)" onClick={() => this.handleTabChange(1)} >
                    <span className="icon icon-saved"></span>
                    Saved
                  </a>
                </li>
                <li className={activeTab === 2 ? "nav-item active" : "nav-item"}>
                  <a href="javascript:void(0)" onClick={() => this.handleTabChange(2)} >
                    <span className="icon icon-media"></span>
                    My Media
                  </a>
                </li>
              </ul>
            </div>

            <div className="left-col">
              <div className="tab-panel">
                {activeTab === 0 && 
                  <React.Fragment>
                    <div className="header">
                      <div className="header-title">
                        Your Shared Skills
                      </div>
                      <div className="header-btn">
                        {
                          isActiveAdd
                          ? <div className="btn-group"> 
                              <button 
                                className="btn btn-blue" 
                                onClick={this.handleBackClick}>
                                BACK
                              </button>
                              {/* <button 
                                className="btn btn-blue" 
                                onClick={this.handleButtonDone}
                                disabled={ nextStap ? "" : "disabled"}>
                                DONE
                              </button> */}
                            </div>
                          : <button className="btn btn-blue" onClick={this.handleAddClick}>
                              ADD
                            </button>
                        }
                      </div>
                    </div>
                    <div className="body">
                      {isActiveAdd 
                      ? <React.Fragment>
                        {nextStap 
                          ? <SubSkillsAdd
                              data={data}
                              selectedSkill={this.state.skills.mainSkill}
                              onDoneButton={(data) => this.handleButtonDone(data)}
                            />
                          : <SkillAdd 
                              handleChangeStap={this.handleChangeStap} 
                              data={data}/>}
                        </React.Fragment> 
                        : <React.Fragment> 
                            {
                              filterSelectedElements.map(element => {
                                return (
                                  <Skill
                                    key={element.id}
                                    title={element.name}
                                    skillCategories={element.skill_categories}
                                    skillTags={element.skill_tags}
                                  />
                                );
                                
                              })
                            }
                          </React.Fragment>
                      }
                    </div>  
                  </React.Fragment>
                }
                { activeTab === 1 && <div>Saved</div>}
                { activeTab === 2 && <div>My Media</div>}

              </div>
            </div>
          </div>

        </div>
        
      </div>
    );
  }
}

export default SkillsPage;
