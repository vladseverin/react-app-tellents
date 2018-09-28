import React, { Component } from 'react';
import Skill from './Skill';
import SkillAdd from './SkillAdd';
import SubSkillsAdd from './SubSkillsAdd';

class SkillsPage extends Component {
  state = {
    activeTab: 0,
    isActiveStep: 0,
    newArrData: [],
    selectedId: null,
  }

  componentDidMount(){
    const { getSkills } = this.props;
    getSkills();
  }

  handleTabChange = (value) => {
    this.setState({ activeTab: value });
  };

  handleActiveStepChange = (value) => {
    this.setState({ isActiveStep: value });
  };

  handleClickDelete = (id) => {
    const { userSkills, deleteSkill } = this.props;
    const filterSelectedElements = userSkills.filter(element => element.selected === true);

    if (filterSelectedElements.length === 1) {
      deleteSkill([]);
      return null;
    }

    const newFilter = userSkills
      .filter(el => el.id !== id)
      .filter(el => el.selected === true)
      .map(el => {
        return {
          id: el.id,
          skill_tags: [
            ...el.skill_tags
          ],
          skill_categories: [
            ...el.skill_categories
              .filter(el => el.selected === true)
              .map(el => el.id)
          ],
        }
      });

    deleteSkill(newFilter);
  }

  handleClickEdit = (id) => {
    const { userSkills } = this.props;

    this.setState({
      selectedId: id,
      isActiveStep: 2,
      newArrData: userSkills,
    });
  }

  render() {
    const { activeTab, isActiveStep, newArrData, selectedId } = this.state;
    const { userSkills, addSkill, getTags, skillTags } = this.props;

    const filterSelectedElements = userSkills.filter(element => element.selected === true);

    return (
      <div className="container-fluid">
        <div className="skills">
          <div className="flexbox">

            <div className="right-col">
              <ul className="nav my-sidebar">
                <li className={activeTab === 0 ? "nav-item active" : "nav-item" } >
                  <a onClick={() => this.handleTabChange(0)}>
                    <span className="icon icon-skills"></span>
                    My Skills
                  </a>
                </li>
                <li className={activeTab === 1 ? "nav-item active" : "nav-item"}>
                  <a onClick={() => this.handleTabChange(1)} >
                    <span className="icon icon-saved"></span>
                    Saved
                  </a>
                </li>
                <li className={activeTab === 2 ? "nav-item active" : "nav-item"}>
                  <a onClick={() => this.handleTabChange(2)} >
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
                          isActiveStep !== 0
                          ? <div className="btn-group"> 
                              <button 
                                className="btn btn-blue" 
                                onClick={() => this.setState({isActiveStep: isActiveStep - 1})}>
                                BACK
                              </button>
                              {/* <button 
                                className="btn btn-blue" 
                                onClick={this.handleButtonDone}
                                disabled={isActiveStep == 2 ? "" : "disabled"}
                              >
                                DONE
                              </button> */}
                            </div>
                          : <button 
                              className="btn btn-blue" 
                              onClick={() => this.setState({ isActiveStep: isActiveStep + 1})}>
                              ADD
                            </button>
                        }
                      </div>
                    </div>
                    <div className="body">
                      { isActiveStep === 0 &&
                        filterSelectedElements.map(element => {
                          return (
                            <Skill
                              key={element.id}
                              title={element.name}
                              skillCategories={element.skill_categories}
                              skillTags={element.skill_tags}
                              handleClickDelete={() => (
                                this.handleClickDelete(element.id))
                              }
                              handleClickEdit={() => (
                                this.handleClickEdit(element.id))
                              }
                            />
                          );
                          
                        })
                      }
                      { isActiveStep === 1 &&
                        <SkillAdd 
                          dataUserSkills={userSkills}
                          nextClick={
                            (newArrData, selectedId) => this.setState({ 
                              isActiveStep: isActiveStep + 1,
                              newArrData,
                              selectedId,
                            })
                          }
                        />
                      }
                      { isActiveStep === 2 &&
                        <SubSkillsAdd 
                          dataUserSkills={newArrData}
                          selectedId={selectedId}
                          handleAddSkill={addSkill}
                          handleTabChange={(value) => this.handleActiveStepChange(value)}
                          handleGetTags={getTags}
                          skillTags={skillTags}
                        />
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
