import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';

import validateEmail from '../utils/validateEmail';

class RegisterForm extends Component {
  handleSubmitFinal = (value) => {
    const { firstName, lastName, email, password } = value;
    const { signup } = this.props;
    signup(firstName, lastName, email, password);
    console.log(firstName, lastName, email, password);
    document.getElementById("hidePopUpBtn2").click();
  }

  required = (value) => {
    const { firstName, lastName, email, password } = value;
    const errors = {};
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!regExp.test(email)) {
      errors.email = 'Not a valid email';
    }

    if (password.length < 8) {
      errors.password = 'Short pass';
    }

    if (!email) {
      errors.email = 'Email is empty';
    }

    if (!password) {
      errors.password = 'Pass is empty';
    }

    if (!firstName) {
      errors.firstName = 'First Name is Empty'
    }

    if (!lastName) {
      errors.lastName = 'Last Name is Empty'
    }

    return errors;
  }

  render() {
    return (
      <div className="modal-dialog" role="document" >
        <div className="modal-content">
          {/* MODAL HEADER */}
          <div className="modal-header">
            <button id="hidePopUpBtn" type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="modal-body">

            <div className="sign-up-modal" >
              <div className="modal-title blue-color">Please Sign Up</div>
              <div className="modal-text">Join over 2 million tallents already using Tellents. Start now for free!</div>

              <Form 
                onSubmit={this.handleSubmitFinal}
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                }}
                validate={this.required}
                render={({ handleSubmit, pristine, invalid, values, errors }) => (
                  <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="inputWrapper">
                      <label className="modal-form_label">
                        <Field
                          className={classNames("modal-form_item", errors.firstName === undefined ? "isValid" : "noValid")} 
                          autoComplete="off"
                          component="input"
                          type="text"
                          name="firstName"
                        />
                        {'Please enter your First Name'}
                      </label>
                    </div>

                    <div className="inputWrapper">
                      <label className="modal-form_label">
                        <Field
                          className={classNames("modal-form_item", errors.lastName === undefined ? "isValid" : "noValid")} 
                          autoComplete="off"
                          component="input"
                          type="text"
                          name="lastName"
                        />
                        {'Please enter your Last name'}
                      </label>
                    </div>

                    <div className="inputWrapper">
                      <label className="modal-form_label">
                        <Field
                          className={classNames("modal-form_item", errors.email === undefined ? "isValid" : "noValid")}
                          autoComplete="off"
                          component="input"
                          type="email"
                          name="email"
                        />
                        {'Check your email'}
                      </label>
                    </div>

                    <div className="inputWrapper">
                      <label className="modal-form_label">
                        <Field
                          className={classNames("modal-form_item", errors.password === undefined ? "isValid" : "noValid")}
                          autoComplete="off"
                          component="input"
                          type="password"
                          name="password"
                        />
                        {'Too short. Use at least 8 characters'}
                      </label>
                    </div>
                    
                    <button 
                      className="btn btn-blue btn-with-icon" 
                      type="submit"
                      disabled={pristine || invalid}
                    >
                      <span className="button-content">
                        <span className="icon icon-right-arrow"></span>
                        START NOW
                      </span>
                    </button>

                    {console.log('value', values)}
                    {console.log('error', errors)}
                  </form>
                )}
              />
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
