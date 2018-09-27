import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateToken } from '../reducers/auth';
import { getJobs, getTalents } from '../reducers/search';
import SearchPage from '../components/SearchPage';

const mapStateToProps = state => ({
  dataUser: state.auth,
  dataJobs: state.search.dataJobs,
  dataUsers: state.search.dataUsers,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    validateToken,
    getTalents,
    getJobs,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);