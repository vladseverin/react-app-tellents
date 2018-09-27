import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from "react-router-dom";
import TalentsPage from './TalantsPage';
import JobsPage from './JobsPage';

class SearchPage extends Component {
  state = {
    isTalentPage: false,
  }

  // componentDidMount() {
  //   const { isGoing } = this.state;
  //   const { getTalents, getJobs } = this.props;

  //   if (isGoing) {
  //     getTalents(1, {});
  //   } else {
  //     getJobs(1, {});
  //   }
  // }

  // handleInputChange = (event) => {
  //   const { name, checked } = event.target;

  //   this.setState({
  //     [name]: checked
  //   });
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('123');
  // }

  // handleChangeFilter = (event) => {
  //   event.preventDefault();
  //   const { name } = event.target;
  //   const { getTalents, getJobs } = this.props;

  //   if (name === "jobs") {
  //     this.setState({
  //       isGoing: false,
  //     });
  //     getJobs();
  //   } else if (name === "talants") {
  //     this.setState({
  //       isGoing: true,
  //     });
  //     getTalents();
  //   }
  // }

  // onKeyPressed = (event) => {
  //   event.preventDefault();
  //   if (event.key === 'Enter') {
  //     console.log(event.key);
  //   }
  // }

  render() {
    const { isTalentPage } = this.state;
    const { match } = this.props;

    return (
      <Switch> 
        <Route path={`${match.url}/talents`} component={TalentsPage} />
        <Route path={`${match.url}/jobs`} component={JobsPage} />
        <Redirect from={`${match.url}`} to={`${match.url}/talents`} />
      </Switch>
      
      // <div className='container-fluid'>
      //   {
      //     isTalentPage
      //       ? <Route 
      //           path={`${match.url}/search/talents`} 
      //           component={TalentsPage}/>
      //       : <Route 
      //           path={`${match.url}/search/jobs`} 
      //           component={JobsPage}/>
      //   }
      // </div>
    );
    // const { dataUser, match, dataJobs, dataUsers } = this.props;
    // const { isGoing } = this.state;

    // const getFullName = `${dataUser.firstName} ${dataUser.lastName}`;
    // console.log(dataJobs, dataUsers)
    // return (
    //   <div className='container-fluid'>

    //     <div className="row contant-header">
    //       <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
    //         <div className="greating">
    //           <div className="greating-name">
    //             Hi {getFullName}
    //           </div>
    //           <div className="greating-text">
    //             WHAT ARE YOU LOOKING FOR TODAY?
    //         </div>
    //         </div>

    //       </div>
    //       <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
    //         <div className="search-form">
    //           <form 
    //             className="my-form-search" 
    //             onKeyDown={this.onKeyPressed}  
    //             onSubmit={this.handleSubmit}>
    //             <input
    //               className="form-control"
    //               type="text"
    //               placeholder="Search for ..."
    //             />

    //             <div className="search-filter">
    //               <button name="jobs" onClick={this.handleChangeFilter} className={isGoing ? "serch-filter-item" : "serch-filter-item radio-text"} >
    //                 Jobs 
    //               </button>
    //               <button name="talants" onClick={this.handleChangeFilter} className={isGoing ? "serch-filter-item radio-text" : "serch-filter-item"} > 
    //                Talants
    //               </button>
    //             </div>

    //             <button type="submit" className="btn-search">
    //               <i className="icon icon-loupe"></i>
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="row">
    //       <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-12">
    //         <div className="job-switcher">
    //           <div className="panel">

    //             <span className={isGoing ? "panel-radio" : "radio-text panel-radio"}>Jobs</span>
    //             <label className="switch">
    //               <input 
                    
    //                 name="isGoing"
    //                 checked={this.state.isGoing}
    //                 type="checkbox" 
    //                 onChange={this.handleInputChange}/>
    //               <span className="slider round"></span>
    //             </label>
    //             <span className={isGoing ? "radio-text panel-radio" : "panel-radio"}>Talants</span>  

    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-12">
    //         <div className="panel">
    //           Sort By
    //         </div>
    //       </div>
    //     </div>

    //     <div className="row contant-body">
    //       {isGoing
    //         ? <Talants />
    //         : <Jobs />}
    //     </div>
    //   </div>
    // );
  }
}

export default SearchPage;
