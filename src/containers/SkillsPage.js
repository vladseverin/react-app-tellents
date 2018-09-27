import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateToken } from '../reducers/auth';
import { getSkills, deleteSkill, addSkill, getTags } from '../reducers/skills';
import SkillsPage from '../components/SkillsPage';

const mapStateToProps = state => ({
  userSkills: state.skills.userSkills,
  skillTags: state.skills.skillTags,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    validateToken,
    getSkills,
    deleteSkill,
    addSkill,
    getTags
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);