import React, { Component } from 'react';

class SkillAdd extends Component {
  state = {
    selectedOption: null,
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { handleChangeStap } = this.props;

    handleChangeStap(this.state.selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    const { data } = this.props;
    

    return (
      <div className="skill-list-block">
        <div className="skill-list-title">
          Choose Your Skill
        </div>
        <div className="skill-list-body">

          <form onSubmit={this.handleFormSubmit}>
            <div className="radio-wrap">
              {data.map((element, id) => (
                <div className="radio" key={id}>
                  <label>
                    <input
                      type="radio"
                      value={element.mainSkill}
                      onChange={this.handleOptionChange}
                      checked={selectedOption === element.mainSkill} />
                    <span className='checkbox-text'>{element.mainSkill}</span>
                  </label>
                </div>
              ))}
            </div>
            
            <button className="btn btn-blue btn-default" disabled={selectedOption !== null ? '' : 'disabled'} type="submit">NEXT</button>
          </form>

        </div>
      </div>
    );
  }
}

export default SkillAdd;
