import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signup, login, validateToken } from '../reducers/auth';
import LandingPage from '../components/LandingPage';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login,
    signup,
    validateToken,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);