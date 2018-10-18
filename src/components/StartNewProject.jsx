import React, { Component } from 'react';
import $ from 'jquery';
import { dataAvailability } from '../utils/data-jobs';
import { Object } from 'core-js';

class StartNewProject extends Component {
  state = {
    jobTitle: '',
    jobDescr: '',
    category: '',
    skill_tags: [],
    skillTestTitle: '', 
    skillTestDescr: '',
    selectedPromo: null,
    jobPayment: '',
    completeJobNum: 1,
    completeJobUnits: 'DAY',
    level: '',
    commitment: '',
    time_type: '',
    hourly_price: '',
    contract_general_notes: '',
    terms: false,

    promoBlock: '',
    isSelectedCategory: null,
    isSelectedSubCategory: null,
    // isSelectedSubCat: null,
    selectedSkill: null,
    isOpenDropDown: false,
    searchText: '',
    tags: [],
    createSkillTest: true,
    chooseExistingSkillTest: false,
    radioIsSelected: 'CreateSkillTest',
    isSelectedJobPay: '',
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
    if (name === 'CreateSkillTest') {
      this.setState({
        radioIsSelected: name,
        promoBlock: '',
        selectedPromo: null,
      });
      return null;
    }
    this.setState({
      radioIsSelected: name,
    })
  }

  handleCategoryItem = (el) => (event) => {
    event.preventDefault();
    
    this.setState({
      isSelectedCategory: el,
    });
    // console.log(el);
  }

  handleSubCategoryItem = (el) => (event) => {
    event.preventDefault();

    this.setState({
      isSelectedSubCategory: el
    });
  }

  handlSelectPromotion = (el) => {
    this.setState({
      promoBlock: el.id,
      selectedPromo: el,
      radioIsSelected: 'ChooseExistingSkill',
      skillTestDescr: '',
      skillTestTitle: '',
    })
  }

  handleChangePrice = (event) => {
    const { name } = event.target;

    if( name === 'fix') {
      this.setState({
        isSelectedJobPay: name,
        hourly_price: '',
      })
      return null;
    }
    this.setState({
      isSelectedJobPay: name,
    });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { addNewJob } = this.props;

    const {
      jobTitle,
      jobDescr,
      category,
      skill_tags,
      skillTestTitle,
      skillTestDescr,
      selectedPromo,
      jobPayment,
      completeJobNum,
      completeJobUnits,
      level,
      commitment,
      time_type,
      hourly_price,
      contract_general_notes,
      isSelectedJobPay,
    } = this.state;

    const sendObj = {
      category,
      skill_tags,
      commitment,
      contract_general_notes,
      description: jobDescr,
      hourly_price,
      level,
      payment: isSelectedJobPay,
      period: completeJobNum,
      period_type: completeJobUnits.toLocaleLowerCase(),
      price: parseInt(jobPayment),
      promotion_description: skillTestDescr,
      promotion_title: skillTestTitle,
      time_type,
      title: jobTitle,
      promotion: selectedPromo,
    };

    document.getElementById("closeNewProject").click();

    Object.keys(sendObj).forEach((key) => (sendObj[key] === '' || sendObj[key] === null ) && delete sendObj[key]);

    addNewJob(sendObj);

    this.setState({
      jobTitle: '',
      jobDescr: '',
      category: '',
      skill_tags: [],
      skillTestTitle: '',
      skillTestDescr: '',
      selectedPromo: null,
      jobPayment: '',
      completeJobNum: 1,
      completeJobUnits: 'DAY',
      level: '',
      commitment: '',
      time_type: '',
      hourly_price: '',
      contract_general_notes: '',
      terms: false,

      promoBlock: '',
      isSelectedCategory: null,
      isSelectedSubCategory: null,
      // isSelectedSubCat: null,
      selectedSkill: null,
      isOpenDropDown: false,
      searchText: '',
      tags: [],
      createSkillTest: true,
      chooseExistingSkillTest: false,
      radioIsSelected: 'CreateSkillTest',
      isSelectedJobPay: '',
    });
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
      isSelectedCategory,
      isSelectedSubCategory,
      promoBlock,
      isSelectedJobPay,
      completeJobUnits,
      level,
      commitment,
      time_type,
      hourly_price,
      jobPayment,
      contract_general_notes,
      terms,
      completeJobNum,
    } = this.state;
    const { dataSkills, dataPromotions } = this.props;

    const getSkillCategories = selectedSkill && category.skill_categories;
    const categories = dataPromotions && dataPromotions.categories;
    const cutRowCat = isSelectedCategory !== null 
      ? isSelectedCategory.name.length > 17 
        ? isSelectedCategory.name.slice(0, 18) + '...'
        : isSelectedCategory.name
      : null;
    const cutRowSubCat = isSelectedSubCategory !== null 
      ? isSelectedSubCategory.name.length > 17 
        ? isSelectedSubCategory.name.slice(0, 18) + '...'
        : isSelectedSubCategory.name
      : null;
    const subCategories = isSelectedCategory && isSelectedCategory.skill_categories;
    const promotions = isSelectedCategory !== null 
      ? dataPromotions.promotions.filter(el => el.title === isSelectedCategory.name)
      : dataPromotions.promotions;
      
    console.log(this.state);
    return (
      <div className="modal fade" id="startNewProject" tabIndex="-1" role="dialog" aria-labelledby="startNewProjectLabel" aria-hidden="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              
              <button type="button" id="closeNewProject" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="modal-title" id="startNewProjectLabel">Post a Job</h5>
              <div className="post-job-form">
                <form onSubmit={this.handleSubmitForm} className="main-project-form">
                  
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
                        <div className="promo-block-form-header">
                          <div className="filter">
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownCategory" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {isSelectedCategory !== null 
                                  ? cutRowCat
                                  : "Category"}
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownCategory">
                                {
                                  categories && categories.map(el => (
                                    <a 
                                      className="dropdown-item" 
                                      onClick={this.handleCategoryItem(el)}
                                      key={el.id}>
                                      {el.name}
                                    </a>
                                  ))
                                }
                              </div>
                            </div>
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownSubCategory" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {isSelectedSubCategory !== null
                                  ? cutRowSubCat
                                  : 'Sub Category'}
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownSubCategory">
                                {
                                  subCategories && subCategories.map(el => (
                                    <a
                                      className="dropdown-item"
                                      onClick={this.handleSubCategoryItem(el)}
                                      key={el.id}>
                                      {el.name}
                                    </a>
                                  ))
                                }
                              </div>
                              
                            </div>
                            <div className="results-numb">
                              {promotions && promotions.length} results
                            </div>
                          </div>
                        
                          <div className="promo-block-form-body">
                            {
                              promotions && promotions.map(el => (
                                <div className="promo-block-item" key={el.id}>
                                  <label className="promo-block-item-inner">
                                    <input 
                                      type="radio" 
                                      onChange={() => this.handlSelectPromotion(el)}
                                      checked={promoBlock === el.id}
                                    />
                                    <div className="panel">
                                      <div className="title">
                                        {el.title}
                                      </div>
                                      <div className="description">
                                        {el.description}
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              ))
                            }
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-block">
                    <div className="form-block-wrapper wrapper-radio-section">
                      <div className="form-block-section">
                        <div className="form-block-title">
                          Job Price
                        </div>
                        <div className="radio-block">
                          <label className="fixed-price">
                            <input
                              onChange={this.handleChangePrice}
                              checked={isSelectedJobPay === 'fix'}
                              name="fix" 
                              type="radio" />
                            Fixed Price
                          </label>
                          <div className="hourly-block">
                            <label className="fixed-price">
                              <input
                                onChange={this.handleChangePrice}
                                checked={isSelectedJobPay === 'hourly'}
                                name="hourly" 
                                type="radio" />
                              Hourly
                            </label>
                            <span>
                              <input 
                                value={hourly_price}
                                onChange={(event) => this.setState({ hourly_price: event.target.value})}
                                type="number" 
                                disabled={isSelectedJobPay === 'fix' ? true : ''}/>
                              $ / hour
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-block-section">
                        <div className="form-block-title">
                          Job Payment
                        </div>
                        <div className="hourly-block job-payment">    
                          <span>
                            <input
                              value={jobPayment}
                              onChange={(event) => this.setState({ jobPayment: event.target.value})} 
                              type="number" 
                              required/>
                            $
                          </span>
                        </div>
                        <div className="text">
                          Enter here how much you think it should cost you..
                        </div>
                      </div>

                      <div className="form-block-section">
                      </div>
                    </div>
                    <div className="form-block-wrapper">
                      <div className="form-block-title">
                        Estimated time to complete the Job
                      </div>
                      <div className="btn-group" role="group">
                        <input 
                          value={completeJobNum}
                          onChange={(event) => this.setState({ completeJobNum: event.target.value })}
                          type="number" 
                          className="time-complite"/>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {completeJobUnits}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a
                            onClick={() => this.setState({ completeJobUnits: 'DAY'})} 
                            className="dropdown-item">DAY</a>
                          <a
                            onClick={() => this.setState({ completeJobUnits: 'WEEK'})} 
                            className="dropdown-item">WEEK</a>
                          <a
                            onClick={() => this.setState({ completeJobUnits: 'MONTH'})} 
                            className="dropdown-item">MONTH</a>
                          <a
                            onClick={() => this.setState({ completeJobUnits: 'YEAR'})} 
                            className="dropdown-item">YEAR</a>
                        </div>
                      </div>
                    </div>
                    <div className="form-block-wrapper wrapper-talent">
                      <div className="form-block-section">
                        <div className="form-block-title">
                          Talent Commitment
                        </div>
                        <div className="radio-block">
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({commitment: event.target.name})} 
                              checked={commitment === 'decide_later'}
                              name="decide_later"
                              type="radio" />
                            I will Decide Later
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({commitment: event.target.name})} 
                              checked={commitment === 'per_week_10'}
                              name="per_week_10"
                              type="radio" />
                            10 hrs per week
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({commitment: event.target.name})} 
                              checked={commitment === 'per_week_up_to_30'}
                              name="per_week_up_to_30"
                              type="radio" />
                            Up to 30 hrs per week
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({commitment: event.target.name})} 
                              checked={commitment === 'per_week_more_than_30'}
                              name="per_week_more_than_30"
                              type="radio" />
                            More than 30 hrs per week
                          </label>
                        </div>
                      </div>
                      
                      <div className="form-block-section">
                        <div className="form-block-title">
                          Talent Level
                        </div>
                        <div className="radio-block">
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({level: event.target.name})}
                              checked={level === 'intern'}
                              name="intern"
                              type="radio" />
                            Intern
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({level: event.target.name})}
                              checked={level === 'junior'}
                              name="junior"
                              type="radio" />
                            Junior
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({level: event.target.name})}
                              checked={level === 'senior'}
                              name="senior"
                              type="radio" />
                            Senior
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({level: event.target.name})}
                              checked={level === 'expert'}
                              name="expert"
                              type="radio" />
                            Expert
                          </label>
                        </div>
                      </div>

                      <div className="form-block-section">
                        <div className="form-block-title">
                          Project type
                        </div>
                        <div className="radio-block">
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({ time_type: event.target.name})}
                              checked={time_type === 'one_time'}
                              name="one_time"
                              type="radio" />
                            One time
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({ time_type: event.target.name})}
                              checked={time_type === 'long_term'}
                              name="long_term"
                              type="radio" />
                            Long term
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({ time_type: event.target.name})}
                              checked={time_type === 'short'}
                              name="short"
                              type="radio" />
                            Short
                          </label>
                          <label className="fixed-price">
                            <input
                              onChange={(event) => this.setState({ time_type: event.target.name})}
                              checked={time_type === 'not_sure'}
                              name="not_sure"
                              type="radio" />
                            Not sure
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-block-wrapper">
                      <div className="form-block-title">
                        Contract General Notes
                      </div>
                      <textarea onChange={(event) => this.setState({contract_general_notes: event.target.value})} value={contract_general_notes} name="jobDescr" className="job-descr form-control has-validate" rows="4" placeholder="Enter here Comments for the contract"></textarea>
                    </div>
                    <div className="form-block-wrapper">
                      <div className="form-block-title">
                        Contract General Notes
                      </div>
                      <div className="form-block-body">
                        <div className="form-itme-warning">
                          You need to agree with terms of use to continue
                        </div>
                        <label className="fixed-price">
                          <input
                            onChange={() => this.setState({ terms: !terms })}
                            checked={terms}
                            type="checkbox" />
                          <div>I agree for the <a className="terms-accept">terms of use</a></div> .
                        </label>
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary submit-new-project" 
                        // disabled={jobTitle && jobDescr && skillTestTitle && skillTestDescr && jobPayment && terms ? '' : true}
                      >
                        POST
                      </button>
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default StartNewProject;
