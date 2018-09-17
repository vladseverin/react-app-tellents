import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, validateToken } from '../reducers/auth';
import HomePage from '../components/HomePage';

const mapStateToProps = state => ({
  isAuthenticate: state.auth.isAuthenticate
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logout, 
    validateToken, 
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);