import { connect } from 'react-redux';
import { signup, login, validateToken } from '../reducers/auth';
import App from '../components/App';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);