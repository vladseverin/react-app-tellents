import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import SearchPage from '../containers/SearchPage';
import SkillsPage from './SkillsPage';

class HomePage extends Component {
  handleLogOut = () => {
    const { logout } = this.props;
    logout();
  }

  componentWillMount() {
    const { validateToken } = this.props;
    validateToken();
  }

  render() {
    const { match } = this.props;
    
    return (
      <div className='home-page'>
        <div className="home-page-header">
          <div className="wrapper">

            <div className="link-wrap">
              <div className="link-item">
                <Link to={`${match.url}/search`} className="link-item-btn">
                  Search
                </Link>
              </div>
              <div className="link-item">
                <Link to={`${match.url}/skills`} className="link-item-btn">
                  Skills
                </Link>
              </div>
              <div className="link-item">
                <button className="link-item-btn" onClick={this.handleLogOut}>
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="home-page-body">
          <Route exact path={`${match.url}`} component={() => <h1> Choose what you need</h1>} />
          <Route path={`${match.url}/search`} component={SearchPage} />
          <Route path={`${match.url}/skills`} component={SkillsPage} />
        </div>
      </div>
    );
  }
}

export default HomePage;
