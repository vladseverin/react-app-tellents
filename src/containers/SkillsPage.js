import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validateToken } from '../reducers/auth';
import { getSkills, deleteSkill, addSkill } from '../reducers/skills';
import SkillsPage from '../components/SkillsPage';

const mapStateToProps = state => ({
  userSkills: state.skills.userSkills,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    validateToken,
    getSkills,
    deleteSkill,
    addSkill
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsPage);