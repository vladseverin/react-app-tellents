import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateToken } from '../reducers/auth';
import { getJobs, getTalents, unmountTalents, unmountJobs, getSkills, getPromotions, addNewJob } from '../reducers/search';
import { getTags } from '../reducers/skills';
import SearchPage from '../components/SearchPage';

const mapStateToProps = state => ({
  dataUser: state.auth,
  dataJobs: state.search.dataJobs,
  dataUsers: state.search.dataUsers,
  dataSkills: state.search.dataSkills,
  skillTags: state.skills.skillTags,
  dataPromotions: state.search.dataPromotions,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    validateToken,
    getTalents,
    getJobs,
    unmountTalents,
    unmountJobs,
    getSkills,
    getTags,
    getPromotions,
    addNewJob,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);