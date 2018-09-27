import axios from 'axios';
import history from '../utils/history';

const TALENTS_REQUEST = 'TALENTS_REQUEST';
const TALENTS_SUCCESS = 'TALENTS_SUCCESS';
const TALENTS_FAILURE = 'TALENTS_FAILURE';

const JOBS_REQUEST = 'JOBS_REQUEST';
const JOBS_SUCCESS = 'JOBS_SUCCESS';
const JOBS_FAILURE = 'JOBS_FAILURE';

export function getJobs(pageNumber, obj) {
  return (dispatch) => {
    dispatch({
      type: JOBS_REQUEST,
    });

    axios.get(`https://floating-atoll-63112.herokuapp.com/api/v1/jobs/search`, {
      params: {
        page: pageNumber,
        q: obj
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => dispatch({
        type: JOBS_SUCCESS,
        payload: json,
      }))
      .catch(reason => dispatch({
        type: JOBS_FAILURE,
        payload: reason,
      }));
  }
}

export function getTalents(pageNumber, obj) {
  return (dispatch) => {
    dispatch({
      type: TALENTS_REQUEST,
    });

    axios.get(`https://floating-atoll-63112.herokuapp.com/api/v1/tellents/search`, {
      params: {
        page: pageNumber,
        q: obj
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => dispatch({
        type: TALENTS_SUCCESS,
        payload: json,
      }))
      .catch(reason => dispatch({
        type: TALENTS_FAILURE,
        payload: reason,
      }));
  }
}

const initialState = {
  dataJobs: {
    jobs: [],
    meta: {}
  },
  dataUsers: {
    users: [],
    meta: {}
  },
}

const actionsMap = {
  [JOBS_SUCCESS]: (state, action) => {
    return {
      ...state,
      dataJobs: {
        ...state.dataJobs,
        jobs: [
          ...state.dataJobs.jobs,
          ...action.payload.data.jobs,
        ],
        meta: action.payload.data.meta,
      }
    }
  },
  [TALENTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      dataUsers: {
        ...state.dataUsers,
        users: [
          ...state.dataUsers.users,
          ...action.payload.data.users,
        ],
        meta: action.payload.data.meta,
      }
    }
  }
}

export default function search(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}