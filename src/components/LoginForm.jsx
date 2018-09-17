import React, { Component } from 'react';
import classNames from 'classnames';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;

    if ( email.text && password.text ) {
      login(email.text, password.text);
      document.getElementById("hidePopUpBtn2").click();
    }
  }

  render() {
    const { email, password } = this.state;

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

              <form className="modal-form form-signin" onSubmit={this.handleSubmit}>

                <div className="loginWrapper">
                  <input 
                    className="modal-form_item"
                    type="text" 
                    name="email" 
                    value={email.text} 
                    onChange={this.handleChange} 
                    placeholder="Email Adress"
                  />
                </div>

                <div className="loginWrapper">
                  <input 
                    className="modal-form_item"
                    type="password" 
                    name="password" 
                    value={password.text} 
                    onChange={this.handleChange} 
                    placeholder="Password (8 or more characters)"
                  />
                </div>

                <button className="btn btn-blue btn-with-icon" type="submit">
                  <span className="button-content">
                    LOG IN
                  </span>
                </button>
              </form>


            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default LoginForm;
