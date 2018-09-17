import React, { Component } from 'react';
import classNames from 'classnames';

import validateEmail from '../utils/validateEmail';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        text: '',
        isValid: false,
      },
      lastName: {
        text: '',
        isValid: false,
      },
      email: {
        text: '',
        isValid: false,
      },
      password: {
        text: '',
        isValid: false,
      },
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: {
        text: value,
        isValid: value ? true : false,
      }
    });

    //valid pass
    if (name === "password") {
      console.log(value.length);
      value.length < 8 ? this.setState({
        [name]: {
          text: value,
          isValid: false,
        }
      }) : this.setState({
        [name]: {
          text: value,
          isValid: true,
        }
      });
    }

    //valid email
    if (name === "email") {
      console.log(value);

      if (validateEmail(value)) {
        this.setState({
          [name]: {
            text: value,
            isValid: true,
          }
        });
      } else {
        this.setState({
          [name]: {
            text: value,
            isValid: false,
          }
        });
      }
    }
  }

  componentWillUnmount(nextState) { 
    this.setState({
      firstName: {
        text: '',
        isValid: false,
      },
      lastName: {
        text: '',
        isValid: false,
      },
      email: {
        text: '',
        isValid: false,
      },
      password: {
        text: '',
        isValid: false,
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;

    if (firstName.isValid && lastName.isValid && email.isValid && password.isValid) {
      console.log(firstName, lastName, email, password);
    } else {
      console.log('Something not valid')
    }
  }

  render() {
    const { firstName, lastName, email, password } = this.state;

    return (
      <div className="modal-dialog" role="document" >
        <div className="modal-content">
          {/* MODAL HEADER */}
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="modal-body">

            <div className="sign-up-modal" >
              <div className="modal-title blue-color">Please Sign Up</div>
              <div className="modal-text">Join over 2 million tallents already using Tellents. Start now for free!</div>

              <form className="modal-form" onSubmit={this.handleSubmit}>
                <div className="inputWrapper">
                  <label className="modal-form_label">

                    <input 
                      className={classNames("modal-form_item", firstName.isValid ? "isValid" : "noValid")} 
                      autoComplete="off" 
                      type="text" 
                      name="firstName" 
                      value={firstName.text} 
                      onChange={this.handleChange} 
                    />
                    { !firstName.isValid && 'Please enter your First Name' }
                  </label>
                </div>

                <div className="inputWrapper">
                  <label className="modal-form_label">

                    <input 
                      className={classNames("modal-form_item", lastName.isValid ? "isValid" : "noValid")} 
                      autoComplete="off" 
                      type="text" 
                      name="lastName" 
                      value={lastName.text} 
                      onChange={this.handleChange} 
                    />
                    { !lastName.isValid && 'Please enter your Last name' }
                  </label>
                </div>

                <div className="inputWrapper">
                  <label className="modal-form_label">

                    <input 
                      className={classNames("modal-form_item", email.isValid ? "isValid" : "noValid")}
                      autoComplete="off" 
                      type="email" 
                      name="email" 
                      value={email.text} 
                      onChange={this.handleChange} 
                    />
                    { !email.isValid && 'Check your email' }
                  </label>
                </div>

                <div className="inputWrapper">
                  <label className="modal-form_label">

                    <input 
                      className={classNames("modal-form_item", password.isValid ? "isValid" : "noValid")}
                      autoComplete="off" 
                      type="password" 
                      name="password" 
                      value={password.text} 
                      onChange={this.handleChange} 
                    />
                    { !password.isValid && 'Too short. Use at least 8 characters' }
                  </label>
                </div>


                <button className="btn btn-blue btn-with-icon" type="submit">
                  <span className="button-content">
                    <span className="icon icon-right-arrow"></span>
                    START NOW
                  </span>
                </button>
              </form>

              <button className="btn btn-link" ng-click="$ctrl.openLogInDialog()">Already have an account?<br/> Please SignIn</button>

            </div>
          </div>

          {/* MODAL FOOTER */}
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
    );
  }
}

export default RegisterForm;
