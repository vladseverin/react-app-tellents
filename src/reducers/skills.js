import axios from 'axios';
import history from '../utils/history';

const SKILLS_REQUEST = 'SKILLS_REQUEST';
const SKILLS_SUCCESS = 'SKILLS_SUCCESS';
const SKILLS_FAILURE = 'SKILLS_FAILURE';

const DELETE_REQUEST = 'DELETE_REQUEST';
const DELETE_SUCCESS = 'DELETE_SUCCESS';
const DELETE_FAILURE = 'DELETE_FAILURE';

const ADD_SKILL_REQUEST = 'ADD_SKILL_REQUEST';
const ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS';
const ADD_SKILL_FAILURE = 'ADD_SKILL_FAILURE';

const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

const REDIRECT = 'REDIRECT';

export function redirect(to) {
  return (dispatch) => {
    history.push(`${process.env.PUBLIC_URL}${to}`);
    dispatch({
      type: REDIRECT,
      payload: { to },
    });
  };
}

export function getSkills() {
  return (dispatch) => {
    dispatch({
      type: SKILLS_REQUEST,
    });

    axios.get(`https://floating-atoll-63112.herokuapp.com/api/v1/profile/skills/user`)
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
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => {       
        dispatch({
          type: DELETE_SUCCESS,
          payload: json.data,
        });
        dispatch(getSkills());
        return json;
      })
      .catch(reason => dispatch({
        type: DELETE_FAILURE,
        payload: reason
      }));
  }
}

export function addSkill(data) {
  return (dispatch) => {
    dispatch({
      type: ADD_SKILL_REQUEST,
    });

    axios.post('https://floating-atoll-63112.herokuapp.com/api/v1/profile/skills', {
      categories: data,
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => {
        dispatch({
          type: ADD_SKILL_SUCCESS,
          payload: json.data,
        })
        dispatch(getSkills());
        return json;
      })
      .catch(reason => dispatch({
        type: ADD_SKILL_FAILURE,
        payload: reason
      }));
  }
}

export function getTags(point){
  return (dispatch) => {
    dispatch({
      type: GET_TAGS_REQUEST,
    });

    axios.get(`https://floating-atoll-63112.herokuapp.com/api/v1/profile/skills/search`, {
      params: {
        q: point,
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => dispatch({
        type: GET_TAGS_SUCCESS,
        payload: json.data.skills,
      }))
      .catch(reason => dispatch({
        type: GET_TAGS_FAILURE,
        payload: reason
      }));
  }
}

const initialState = {
  userSkills: [],
  skillTags: []
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
  },
  [GET_TAGS_SUCCESS]: (state, action) => {
    return {
      ...state,
      skillTags: action.payload,
    }
  }
}

export default function skills(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}