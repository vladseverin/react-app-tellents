import Auth from 'j-toker';
import getCookie from '../utils/getCookies';
import axios from 'axios';

const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const TOKEN_REQUEST = 'TOKEN_REQUEST';
const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
const TOKEN_FAILURE = 'TOKEN_FAILURE';

let token = null;

Auth.configure({
  apiUrl: 'https://floating-atoll-63112.herokuapp.com/api',
  storage: 'localStorage',
});

const getLocalStorage = JSON.parse(localStorage.getItem('authHeaders'));

if (getLocalStorage) {
  axios.defaults.headers.common['access-token'] = getLocalStorage['access-token'];
  axios.defaults.headers.common['client'] = getLocalStorage['client'];
  axios.defaults.headers.common['expiry'] = getLocalStorage['expiry'];
  axios.defaults.headers.common['token-type'] = getLocalStorage['token-type'];
  axios.defaults.headers.common['uid'] = getLocalStorage['uid'];
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    Auth.emailSignIn({
      email: email,
      password: password
    })
      .then(response => {
        if (response.success === true) {
          return response;
        }

        throw new Error(response.errors);
      })
      .then(json => dispatch({
        type: LOGIN_SUCCESS,
        payload: json,
      }))
      .catch(reason => dispatch({
        type: LOGIN_FAILURE,
        payload: reason,
      }));
  }
}

export function signup(fistName, lastName, email, password) {
  return (dispatch) => {
    dispatch({
      type: SIGNUP_REQUEST,
    });

    Auth.emailSignUp({
      email: email,
      first_name: fistName,
      last_name: lastName,
      password: password,
    })
      .then((response) => {
        if (response.status === 'success') {
          return response;
        }

        throw new Error(response.errors);
      })
      .then((json) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: json,
        });
        return json;
      })
      .catch(reason => dispatch({
        type: SIGNUP_FAILURE,
        payload: reason,
      }));
  };
}



export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    Auth.signOut()
      .then(response => {
        if (response.success === true) {
          return response;
        }

        throw new Error (response.errors);
      })
      .then(json => {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: json,
        });
      })
      .catch(reason => dispatch({
        type: LOGOUT_FAILURE,
        payload: reason,
      }));
  }
}

export function validateToken() {
  return (dispatch) => {
    dispatch({
      type: TOKEN_REQUEST,
    });

    Auth.validateToken()
      .then(user => {
        token = getCookie("authHeaders")
          ? JSON.parse(getCookie("authHeaders"))['access-token']
          : null;
        if (token) {
          return user;
        }

        throw new Error(user);
      })
      .then(json => dispatch({
        type: TOKEN_SUCCESS,
        payload: json,
      }))
      .catch(reason => {
        dispatch({
          type: TOKEN_FAILURE,
          payload: reason,
        })
      });
  }
}

const initialState = {
  isAuthenticated: !!token,
  email: null,
  firstName: null,
  lastName: null,
}

const actionsMap = {
  [SIGNUP_SUCCESS]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      email: action.payload.data.email,
      firstName: action.payload.data.first_name,
      lastName: action.payload.data.last_name,
      image: action.payload.data.image.url,
    }
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      email: action.payload.data.email,
      firstName: action.payload.data.first_name,
      lastName: action.payload.data.last_name,
      image: action.payload.data.image.url,
    }
  },
  [LOGOUT_SUCCESS]: (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      email: null,
      firstName: null,
      lastName: null,
      image: null,
    }
  },
  [TOKEN_SUCCESS]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      email: action.payload.email,
      firstName: action.payload.first_name,
      lastName: action.payload.last_name,
      image: action.payload.image.url,
    }
  },

}

export default function auth(state = initialState, action){
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}


