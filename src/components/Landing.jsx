import React, { Component } from 'react';
import Logo from '../img/brand.png';
import RegisterForm from './RegisterForm';

class Landing extends Component {
  render() {
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

              {/* <!-- Modal Register--> */}
              <div className="modal fade sign-up-modal" id="registerModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document" >
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <RegisterForm />
                    </div>
                    <div className="modal-footer">
                      <div 
                        className="modal-footer-content ng-isolate-scope">
                          Or you could sign up with
                        <button className="btn circul-shape soc-btn soc-btn--f" ng-click="$ctrl.omniAuth('facebook')">
                          <span className="icon icon-facebook"></span>
                        </button>
                        <span>or </span>
                        <button className="btn circul-shape soc-btn soc-btn--g" ng-click="$ctrl.omniAuth('google')">
                          <span className="icon icon-google-plus-logo"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* <!-- Modal Signin--> */}
              {/* <Modal id='loginModal'>
                <div className="sign-up-modal" >
                  <div className="modal-title blue-color">Please Sign Up</div>
                  <div className="modal-text">Join over 2 million tallents already using Tellents. Start now for free!</div>
                </div>
              </Modal> */}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
