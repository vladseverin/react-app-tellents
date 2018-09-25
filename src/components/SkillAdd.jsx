import React, { Component } from 'react';

class SkillAdd extends Component {
  state = {
    selectedOption: null,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { nextClick } = this.props;

    nextClick();
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="skill-list-block">
        <div className="skill-list-title">
          Choose Your Skill
        </div>
        <div className="skill-list-body">

          <form onSubmit={this.handleFormSubmit}>
            <div className="radio-wrap">
              
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      // value={element.mainSkill}
                      // onChange={this.handleOptionChange}
                      // checked={selectedOption === element.mainSkill} 
                    />
                    <span className='checkbox-text'>Text</span>
                  </label>
                </div>

            </div>
            
            <button 
              className="btn btn-blue btn-default" 
              type="submit">
              NEXT
            </button>
          </form>

        </div>
      </div>
    );
  }
}

export default SkillAdd;
