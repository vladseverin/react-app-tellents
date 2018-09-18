import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const SearchPage = () => <h1>Search</h1>;
const SkillsPage = () => <h1>Skills</h1>;

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
    return (
      <div className='home-page'>
        <div className="wrapper">
          Choose what you need.

          <div className="link-wrap">
            <div className="link-item">
              {/* <Link to={`${match.url}/search`} className="btn">
                Search
              </Link> */}
            </div>
            <div className="link-item">
              {/* <Link to={`${match.url}/skills`} className="btn">
                Skills
              </Link> */}
            </div>
          </div>

          <button className="btn" onClick={this.handleLogOut}>
            Logout
          </button>


          {/* <Route path={`${match.url}/search`} component={SearchPage} />
          <Route path={`${match.url}/skills`} component={SkillsPage} /> */}
        </div>
      </div>
    );
  }
}

export default HomePage;
