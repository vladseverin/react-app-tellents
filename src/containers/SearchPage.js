import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateToken } from '../reducers/auth';
import SearchPage from '../components/SearchPage';

const mapStateToProps = state => ({
  dataUser: state.auth,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    validateToken,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);