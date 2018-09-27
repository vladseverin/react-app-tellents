import React, { Component } from 'react';
import axios from 'axios';


class SubSkillsAdd extends Component {
  state = {
    userSkills: [],
    isOpenDropDown: false,
    searchText: '',
    tags: [],
    selectTags: [],
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
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { userSkills } = this.state;
    const { handleAddSkill, handleTabChange } = this.props;

    //формируем объект для сервера
    const newFilter = userSkills
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
    
    handleAddSkill(newFilter);
    handleTabChange(0);
  }

  handleChangeInput = (event) => {
    const { handleGetTags } = this.props;
    const { value } = event.target;
    const { searchText } = this.state;

    this.setState({
      searchText: value,
    });

    handleGetTags(value);    
  }

  componentWillReceiveProps(nextProps) {
    const { handleGetTags } = this.props;
    console.log(nextProps.skillTags);
    console.log(nextProps.skillTags.length);
    

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
    })
  }

  handleClickOnTag = (id) => {
    const { tags, selectTags } = this.state;

    const pointOnTag = tags.filter(el => el.id === id)[0];

    console.log(pointOnTag);
    this.setState({
      isOpenDropDown: false,
      searchText: '',
      selectTags: [
        ...selectTags,
        pointOnTag
      ]
    });
  }
  
  render() {
    const { selectedId } = this.props;
    const { userSkills, isOpenDropDown, tags, selectTags } = this.state;

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
                        onClick={() => this.handleClickOnTag(el.id)}
                      >
                        {el.name}
                      </li>
                    ))
                  }
                </ul>
              }

            </div>
            {
              selectTags.length !== 0 &&
                selectTags.map(el => (
                  <span key={el.id}>{el.name}</span>
                ))
            }

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

export default SubSkillsAdd;
