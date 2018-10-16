import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateToken } from '../reducers/auth';
import { getJobs, getTalents, unmountTalents, unmountJobs, getSkills } from '../reducers/search';
import { getTags } from '../reducers/skills';
import SearchPage from '../components/SearchPage';

const mapStateToProps = state => ({
  dataUser: state.auth,
  dataJobs: state.search.dataJobs,
  dataUsers: state.search.dataUsers,
  dataSkills: state.search.dataSkills,
  skillTags: state.skills.skillTags,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    validateToken,
    getTalents,
    getJobs,
    unmountTalents,
    unmountJobs,
    getSkills,
    getTags
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);