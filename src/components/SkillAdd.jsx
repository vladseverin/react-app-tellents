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
    const { dataUserSkills, nextClick } = this.props;
    const { selectedOption } = this.state;
    
    // возвращаем новый массив на основе полученных данных
    const newArrayData = dataUserSkills.map(el => el.name === selectedOption ? { ...el, selected: true } : el);

    //фильтруем и возвращаем id выбранного скила
    const selectedId = dataUserSkills
      .filter(el => el.name === selectedOption)
      .map(el => el.id)[0];

    //устанавливаем стэйт из полученных данных в внешнем компоненте
    nextClick(newArrayData, selectedId);
  }

  render() {
    const { selectedOption } = this.state;
    const { dataUserSkills } = this.props;

    return (
      <div className="skill-list-block">
        <div className="skill-list-title">
          Choose Your Skill
        </div>
        <div className="skill-list-body">

          <form onSubmit={this.handleFormSubmit}>
            <div className="radio-wrap">
              {
                dataUserSkills.map(el => (
                  <div className="radio" key={el.id}>
                    <label>
                      <input
                        type="radio"
                        onChange={this.handleOptionChange}
                        value={el.name}
                        checked={selectedOption === el.name} 
                      />
                      <span className='checkbox-text'>{el.name}</span>
                    </label>
                  </div>
                ))
              }
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
