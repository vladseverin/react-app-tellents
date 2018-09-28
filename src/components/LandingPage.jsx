import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../img/brand.png';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

class LandingPage extends Component {
  componentDidMount() {
    const { validateToken } = this.props;
    validateToken();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/home" } };
    const { login, signup, isAuthenticated, validateToken } = this.props;

    if (isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="landing">
        <div className="landingWrap">

          <div className="wrapper">
            <div className="header">

              <div className="logo">
                <a href="javascript:void(0)">
                  <img src={Logo} />
                </a>
              </div>

              <div className="nav_tablet">
                <div className="nav_list">
                  <div className="nav_list_item">
                    <a className="item_text" href="http://">How It Work</a>
                  </div>
                  <div className="nav_list_item">
                    <a className="item_text" href="http://">Browse Tallents</a>
                  </div>
                  <div className="nav_list_item">
                    <a className="item_text" href="http://">Tallent Categories</a>
                  </div>
                  <div className="nav_list_item">
                    <a className="item_text" href="http://">Sign Up</a>
                  </div>
                </div>
                <div className="nav_btns">
                  <button type="button" data-toggle="modal" data-target="#registerModal" className="nav_btns__item">
                    <span className="button_content">
                      <span className="icon icon-plus-button"></span>
                      Register
                    </span>
                  </button>

                  <button type="button" data-toggle="modal" data-target="#loginModal" className="nav_btns__item">
                    <span className="button_content">
                      <span className="icon icon-user2"></span>
                      Login
                    </span>
                  </button>
                </div>
              </div>

              <div className="modal fade sign-up-modal" id="registerModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <RegisterForm signup={signup} />
              </div>

              <div className="modal fade login-modal" id="loginModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <LoginForm validateToken={validateToken} login={login} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
