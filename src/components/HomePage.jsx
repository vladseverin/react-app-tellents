import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import SearchPage from '../containers/SearchPage';
import SkillsPage from '../containers/SkillsPage';

class HomePage extends Component {
  handleLogOut = () => {
    const { logout } = this.props;
    logout();
  }

  componentDidMount() {
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
                <Link to={`${match.url}/find`} className="link-item-btn">
                  Find
                </Link>
              </div>
              <div className="link-item">
                <Link to={`${match.url}/skills`} className="link-item-btn">
                  Skills
                </Link>
              </div>
              <div className="link-item">
                <button className="btn btn-blue link-item-btn" style={{color: '#fff'}} onClick={this.handleLogOut}>
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>

        <div className="home-page-body">
          <Route exact path={`${match.url}`} component={() => <h1 style={{ textAlign: "center" }}>Welcome to the Tallents</h1>} />
          <Route path={`${match.url}/find`} component={SearchPage} />
          <Route path={`${match.url}/skills`} component={SkillsPage} />
        </div>

      </div>
    );
  }
}

export default HomePage;
