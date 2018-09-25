import axios from 'axios';
import {instance} from '../utils/coll-axios';

const SKILLS_REQUEST = 'SKILLS_REQUEST';
const SKILLS_SUCCESS = 'SKILLS_SUCCESS';
const SKILLS_FAILURE = 'SKILLS_FAILURE';

const DELETE_REQUEST = 'DELETE_REQUEST';
const DELETE_SUCCESS = 'DELETE_SUCCESS';
const DELETE_FAILURE = 'DELETE_FAILURE';


export function getSkills() {
  return (dispatch) => {
    dispatch({
      type: SKILLS_REQUEST,
    });

    axios.get(`https://floating-atoll-63112.herokuapp.com/api/v1/profile/skills/user`)
      .then(response => {
        if(response.status === 200) {
          // console.log(response.data.profession_categories);
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

// return full object
export function deleteSkill(data) {
  return (dispatch) => {
    dispatch({
      type: DELETE_REQUEST,
    });

    axios.post('https://floating-atoll-63112.herokuapp.com/api/v1/profile/skills', {
      categories: data,
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response);
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => dispatch({
        type: DELETE_SUCCESS,
        payload: json.data,
      }))
      .catch(reason => dispatch({
        type: DELETE_FAILURE,
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
  },
  [SKILLS_FAILURE]: (state, action) => {
    return {
      ...state,
      userSkills: [],
    }
  }
}

export default function skills(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}