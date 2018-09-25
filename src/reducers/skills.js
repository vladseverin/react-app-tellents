// import axios from 'axios';
import {instance} from '../utils/coll-axios';

const SKILLS_REQUEST = 'SKILLS_REQUEST';
const SKILLS_SUCCESS = 'SKILLS_SUCCESS';
const SKILLS_FAILURE = 'SKILLS_FAILURE';

export function getSkills() {
  return (dispatch) => {
    dispatch({
      type: SKILLS_REQUEST,
    });

    instance.get(`/profile/skills/user`)
    .then(response => {
      if(response.status === 200) {
        return response;
      }

      throw new Error(response.errors);
    })
    .then(json => dispatch({
      type: SKILLS_SUCCESS,
      payload: json.data,
    }))
    .catch(reason => dispatch({
      type: SKILLS_FAILURE,
      payload: reason
    }));
  }
}

const initialState = {
  userSkills: [],
}

const actionsMap = {
  [SKILLS_SUCCESS]: (state, action) => {
    return {
      ...state,
      userSkills: action.payload.profession_categories,
    }
  }
}

export default function skills(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}