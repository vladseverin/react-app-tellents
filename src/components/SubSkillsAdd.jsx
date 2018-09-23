import React, { Component } from 'react';
import axios from 'axios';

class SubSkillsAdd extends Component {
  state = {
    arr: [],
    skillsTag: [],
    isOpen: false,
  }

  componentDidMount() {
    const { data, selectedSkill } = this.props;
    const getFilterData = data.filter((skill) => skill.mainSkill === selectedSkill)[0];
    
    const newArray = getFilterData.subSkills.map( (element) => {
      return {
        name: element,
        isGoing: false,
      };
    }); 

    getFilterData.subSkills.map( element => (
      this.setState({
        arr: newArray,
      })
    ));
  }

  handleCheckboxChange = (event) => {
    const { name } = event.target;
    const { arr } = this.state;

    this.setState({
      arr: arr.map(element => element.name === name 
        ? { ...element, isGoing: !element.isGoing, } 
        : element)
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { onDoneButton } = this.props;

    const filterArr = this.state.arr.filter( element => element.isGoing === true);

    onDoneButton(filterArr);
  }

  handleAddTag = (event) => {
    const { value } = event.target;

    axios.get(`https://floating-atoll-63112.herokuapp.com/api/v1/profile/skills/search?q=${value}`)
      .then(response => {
        if (response.status === 200){
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => {
        this.setState({
          skillsTag: json.data.skills
        })
        console.log(json.data.skills.length);
        if (json.data.skills.length === 0) {
          this.setState({isOpen: false})
          return json;
        } 

        this.setState({isOpen: true});
        return json;
      })
      .catch(reason => {
        this.setState({isOpen: false});
        console.log(reason);
        return reason;
      });

    console.log(this.state)
  }
  
  render() {
    const { data, selectedSkill } = this.props;
    const getFilterData = data.filter((skill) => skill.mainSkill === selectedSkill)[0];
    return (
      <div className="skill-list-block">
        <div className="skill-list-title">
            {getFilterData.mainSkill}
        </div>

        <div className="skill-list-body">
          <form onSubmit={this.handleFormSubmit}>
            <div className="radio-wrap">
              {
                getFilterData.subSkills.map( (subSkill, id) => (
                  <div className="radio" key={id}>
                      <label>
                        <input
                            type="checkbox"
                            name={subSkill}
                            onChange={this.handleCheckboxChange}
                            />  
                        <span className='checkbox-text'>{subSkill}</span>
                      </label>
                  </div>
                ))
              }
            </div>
            <div className="skill-tags">
              <input className="search-tags" type="search" onChange={this.handleAddTag} placeholder="Write new skill"/>
            </div>

            <button className="btn btn-blue btn-default" type="submit">NEXT</button>
          </form>
        </div>

      </div>
    );
  }
}

export default SubSkillsAdd;
