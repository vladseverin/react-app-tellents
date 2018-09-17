import React, { Component } from 'react';

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
    const { isAuthenticate } = this.props;

    return (
      <div>
        Hello

        <button onClick={this.handleLogOut}>
          Logout
        </button>
      </div>
    );
  }
}

export default HomePage;
