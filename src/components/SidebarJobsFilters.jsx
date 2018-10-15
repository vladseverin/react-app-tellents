import React, { Component } from 'react';
import queryString from 'query-string';
import history from '../utils/history';
import {
  dataExperience,
  dataPlaceOfWork,
  dataLocations,
  dataLanguages,
} from '../utils/data-talents';
import { 
  dataAvailability,
  dataPayment,
  dataBudget,
  dataProposals
} from '../utils/data-jobs';

class SidebarJobsFilters extends Component {
  state = {
    experience: dataExperience,
    posted: '',
    placeOfWork: dataPlaceOfWork,
    locations: dataLocations,
    isPressContry: false,
    isPressLanguage: false,
    languages: dataLanguages,
    availability: dataAvailability,
    payment: dataPayment,
    from: 0,
    to: 1000,
    budgets: '',
    dataBudget: dataBudget,
    isPressBudget: false,
    proposals: '',
    dataProposals: dataProposals,
  }

  handleInputExperienceChange = (event) => {
    const { experience } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...experience.map(el => el.name === name ? el.value = isClicked : el)
    });

    const sortExpIsSelected = experience
      .filter(el => el.value)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { exp: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['exp'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handlePostedChange = (event) => {
    const { posted } = this.state;
    const { parsed } = this.props;
    const { value, checked } = event.target;

    if (posted === value) {
      this.setState({ posted: '' });
    } else {
      this.setState({ posted: value });
    };

    if (checked) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { post: value }))
      });
    } else {
      delete parsed['post'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handlePlaceOfWorkChange = (event) => {
    const { placeOfWork } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...placeOfWork.map(el => el.name === name ? el.value = isClicked : el)
    });

    const sortExpIsSelected = placeOfWork
      .filter(el => el.value)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { place: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['place'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleLocationChange = (event) => {
    const { locations } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;

    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...locations.map(el => el.name === name ? el.selected = isClicked : el)
    });

    const sortLocationIsSelected = locations
      .filter(el => el.selected)
      .map(el => el.name);

    if (sortLocationIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { loc: sortLocationIsSelected.join(',') })),
      });
    } else {
      delete parsed['loc'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleLanguageChange = (event) => {
    const { languages } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;

    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...languages.map(el => el.name === name ? el.selected = isClicked : el)
    });

    const sortLanguagesIsSelected = languages
      .filter(el => el.selected)
      .map(el => el.name);

    if (sortLanguagesIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { lang: sortLanguagesIsSelected.join(',') })),
      });
    } else {
      delete parsed['lang'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleAvailabilityChange = (event) => {
    const { availability } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...availability.map(el => el.name === name ? el.value = isClicked : el)
    });

    const sortExpIsSelected = availability
      .filter(el => el.value)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { avl: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['avl'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handlePaymantChange = (event) => {
    const { payment } = this.state;
    const { parsed } = this.props;
    const { name, type, checked, value } = event.target;
    const isClicked = type === 'checkbox' ? checked : value || '';

    this.setState({
      ...payment.map(el => el.name === name ? el.selected = isClicked : el)
    });

    const sortExpIsSelected = payment
      .filter(el => el.selected)
      .map(el => el.name);

    if (sortExpIsSelected.length !== 0) {
      delete parsed['p_from'];
      delete parsed['p_to'];
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { payment: sortExpIsSelected.join(',') })),
      });
    } else {
      delete parsed['payment'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleClickFindPayment = (event) => {
    const { payment, from, to } = this.state;
    const { parsed } = this.props;

    (payment[0].selected === true && payment[1].selected === true)
      || payment[0].selected === false
      ? history.push({
          search: queryString.stringify(Object.assign({}, parsed, { p_from: from, p_to: to })),
        })
      : history.push({
          search: queryString.stringify(Object.assign({}, parsed, { p_from: 0, p_to: 1000 })),
        });
  }

  handleInputPaymentChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (value > 1000) {
      this.setState({[name] : 1000});
      return null;
    }

    if (value < 0) {
      this.setState({[name] : 0});
      return null;
    }

    this.setState({
      [name]: value
    });
  }

  handleBudgetChange = (event) => {
    const { budgets } = this.state;
    const { parsed } = this.props;
    const { value, checked } = event.target;

    if (budgets === value) {
      this.setState({ budgets: '' });
    } else {
      this.setState({ budgets: value });
    };
    
    if (checked) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { bud: value }))
      });
    } else {
      delete parsed['bud'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  handleProposalsChange = (event) => {
    const { proposals } = this.state;
    const { parsed } = this.props;
    const { value, checked } = event.target;

    if (proposals === value) {
      this.setState({ proposals: '' });
    } else {
      this.setState({ proposals: value });
    };

    if (checked) {
      history.push({
        search: queryString.stringify(Object.assign({}, parsed, { prop: value }))
      });
    } else {
      delete parsed['prop'];
      history.push({
        search: queryString.stringify(parsed),
      });
    }
  }

  render() {
    const { 
      posted, 
      placeOfWork, 
      isPressContry,
      locations,
      isPressLanguage,
      languages,
      availability,
      payment,
      from,
      to,
      isPressBudget,
      budgets,
      dataBudget,
      dataProposals,
      proposals
    } = this.state;
    const { parsed } = this.props;
    console.log(dataProposals);
    return (
      <React.Fragment>
        {/* EXPERIENCE SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Experience:</div>
          <div className="checkbox-list">
            <div className="checkbox-block col-6">
              <input
                name="intern"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Intern</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                name="junior"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Junior</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                name="senior"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Senior</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                name="expert"
                onChange={this.handleInputExperienceChange}
                className="checkbox-block-item"
                type="checkbox"
              />
              <label className="checkbox-block-text"> Expert</label>
            </div>
          </div>
        </div>
      
        {/* Posted SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Posted:</div>
          <div className="checkbox-list">
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i24"
                checked={posted === 'i24' ? true : false}
                onChange={this.handlePostedChange}
              />
              <label className="checkbox-block-text"> 24h</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i3d"
                checked={posted === 'i3d'}
                onChange={this.handlePostedChange}
              />
              <label className="checkbox-block-text"> 3d</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="i1w"
                checked={posted === 'i1w'}
                onChange={this.handlePostedChange}
              />
              <label className="checkbox-block-text"> 1w</label>
            </div>
            <div className="checkbox-block col-6">
              <input
                className="checkbox-block-item"
                type="checkbox"
                value="m_1w"
                checked={posted === 'm_1w'}
                onChange={this.handlePostedChange}
              />
              <label className="checkbox-block-text"> {'> 1w'} </label>
            </div>
          </div>
        </div>
      
        {/* Place Work SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Place of Work:</div>
          <div className="checkbox-list">
            {
              placeOfWork.map((el, id) => (
                <div className="checkbox-block col-6" key={id}>
                  <input
                    name={el.name}
                    onChange={this.handlePlaceOfWorkChange}
                    className="checkbox-block-item"
                    type="checkbox"
                  />
                  <label className="checkbox-block-text">{el.text}</label>
                </div>
              ))
            }
          </div>
        </div>
      
        {/* Location SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Location:</div>

          <div className="filter-dropdown-block col-12">
            <button
              className="btn dropdown-toggle-btn"
              type="button"
              onClick={() => this.setState({ isPressContry: !isPressContry })}
            >
              <div className="btn-inner">
                <span className="text">Contry (All)</span>
                <span className="icon icon-down-arrow"></span>
              </div>
            </button>

            {isPressContry && <div className="dropdown-list">
              <div className="caret-block">
                <span className="caret-top"></span>
              </div>

              <div className="dropdown-list-wrapper">
                <div className="checkbox-list-block">
                  {
                    locations
                      .map((el, id) => (
                        <div className="checkbox-block" key={id}>
                          <label className="chekbox-item">
                            <input
                              type="checkbox"
                              name={el.name}
                              onChange={this.handleLocationChange}
                            />
                            <span className="name">{el.name}</span>
                          </label>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>}
          </div>

        </div>
      
        {/* Languages SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Languages:</div>

          <div className="filter-dropdown-block col-12">
            <button
              className="btn dropdown-toggle-btn"
              type="button"
              onClick={() => this.setState({ isPressLanguage: !isPressLanguage })}
            >
              <div className="btn-inner">
                <span className="text">Languages (All)</span>
                <span className="icon icon-down-arrow"></span>
              </div>
            </button>

            {isPressLanguage && <div className="dropdown-list">
              <div className="caret-block">
                <span className="caret-top"></span>
              </div>

              <div className="dropdown-list-wrapper">
                <div className="checkbox-list-block">
                  {
                    languages
                      .map((el, id) => (
                        <div className="checkbox-block" key={id}>
                          <label className="chekbox-item">
                            <input
                              type="checkbox"
                              name={el.name}
                              onChange={this.handleLanguageChange}
                            />
                            <span className="name">{el.name}</span>
                          </label>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>}
          </div>

        </div>
      
        {/* Availability SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Availability:</div>
          <div className="checkbox-list">
            {
              availability.map((el, id) => (
                <div className="checkbox-block col-6" key={id}>
                  <input
                    name={el.name}
                    onChange={this.handleAvailabilityChange}
                    className="checkbox-block-item"
                    type="checkbox"
                  />
                  <label className="checkbox-block-text">{el.text}</label>
                </div>
              ))
            }
          </div>
        </div>
      
        {/* Payment SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Payment:</div>
          <div className="checkbox-list">
            {
              payment.map((el, id) => (
                <div className="checkbox-block col-6" key={id}>
                  <input
                    name={el.name}
                    onChange={this.handlePaymantChange}
                    className="checkbox-block-item"
                    type="checkbox"
                  />
                  <label className="checkbox-block-text">{el.text}</label>
                </div>
              ))
            }
            <div className="wrap-find-block col-12">
              {
                (payment[0].selected === true && payment[1].selected === true)
                  || payment[0].selected === false
                  ? <div className="filter-inputs"> 
                      <input 
                        onChange={this.handleInputPaymentChange}
                        value={from}
                        type="text"
                        placeholder="0" 
                        name="from"/>
                      <span>to</span>
                      <input 
                        onChange={this.handleInputPaymentChange}
                        value={to}
                        type="text" 
                        placeholder="1000"
                        name="to"/> 
                    </div>
                  : null
              }
              <button onClick={this.handleClickFindPayment} className="btn">
                FIND
              </button>
            </div>

          </div>
        </div>
      
        {/* Budget SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Budget:</div>

          <div className="filter-dropdown-block col-12">
            <button
              className="btn dropdown-toggle-btn"
              type="button"
              onClick={() => this.setState({ isPressBudget: !isPressBudget })}
            >
              <div className="btn-inner">
                <span className="text">Select budget</span>
                <span className="icon icon-down-arrow"></span>
              </div>
            </button>

            {isPressBudget && <div className="dropdown-list">
              <div className="caret-block">
                <span className="caret-top"></span>
              </div>

              <div className="dropdown-list-wrapper">
                <div className="checkbox-list-block">
                  {
                    dataBudget
                      .map((el, id) => (
                        <div className="checkbox-block" key={id}>
                          <label className="chekbox-item">
                            <input
                              type="checkbox"
                              name={el.name}
                              onChange={this.handleBudgetChange}
                              value={el.name}
                              checked={budgets === el.name ? true : false}
                            />
                            <span className="name">{el.name}</span>
                          </label>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>}
          </div>

        </div>
      
        {/* Proposals SECTION */}
        <div className="filter-block">
          <div className='filter-title col-12'>Proposals:</div>
          <div className="checkbox-list">

            {
              dataProposals.map((el, id) => (
                <div className="checkbox-block col-6">
                  <input
                    className="checkbox-block-item"
                    type="checkbox"
                    value={el.name}
                    checked={proposals === el.name ? true : false}
                    onChange={this.handleProposalsChange}
                  />
                  <label className="checkbox-block-text">{el.text}</label>
                </div>
              ))
            }
          </div>
        </div>
      
      </React.Fragment>
    );
  }
}

export default SidebarJobsFilters;
