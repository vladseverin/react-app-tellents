import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

class LoginForm extends Component {
  handleSubmitFinal = (value) => {
    const { email, password } = value;
    const { login } = this.props;
    login(email, password);
    document.getElementById("hidePopUpBtn2").click();
  }

  required = (value) => {
    const { email, password } = value;
    const errors = {};
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!regExp.test(email)){
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

    return errors;
  }

  render() {
    return (
      <div className="modal-dialog" role="document" >
        <div className="modal-content">
          {/* MODAL HEADER */}
          <div className="modal-header">
            <button id="hidePopUpBtn2" type="button login-close-btn" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* MODAL BODY */}
          <div className="modal-body">

            <div className="sign-up-modal" >
              <h1 className="text-center login-title">Login Into Your Account</h1>

              <div className="row omb_row-sm-offset-3 omb_loginOr">
                <div className="col-md-12">
                  <hr className="omb_hrOr" />
                    <span className="omb_spanOr">or</span>
                </div>
              </div>
              
              <Form
                onSubmit={this.handleSubmitFinal}
                initialValues={{ email: '', password: '' }}
                validate={this.required}
                render={({ handleSubmit, pristine, invalid, values, errors }) => (
                  <form className="modal-form form-signin" onSubmit={handleSubmit}>
                    <div className="loginWrapper">
                      <Field 
                        className="modal-form_item"
                        name="email" 
                        component="input" 
                        type="text" 
                        placeholder="Email Adress" 
                      />
                    </div>

                    <div className="loginWrapper">
                      <Field 
                        className="modal-form_item"
                        name="password" 
                        component="input" 
                        type="password"
                        placeholder="Password (8 or more characters)"
                      />
                    </div>

                    <button className="btn btn-blue btn-with-icon" type="submit" disabled={pristine || invalid}>
                      <span className="button-content">
                        LOG IN
                      </span>
                    </button>

                    {console.log('value', values)}
                    {console.log('error', errors)}
                  </form>
                )}
              />


            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default LoginForm;
