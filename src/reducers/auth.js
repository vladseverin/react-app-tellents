import Auth from 'j-toker';

const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

Auth.configure({
  apiUrl: 'https://floating-atoll-63112.herokuapp.com/api',
});

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
      // console.log(json);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: json,
      });
    })
    .catch(reason => {
      // console.log(reason);
      dispatch({
        type: SIGNUP_FAILURE,
        payload: reason,
      })
    });

  };
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
    .then(json => {
      // console.log(json);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: json,
      });
    })
    .catch(reason => {
      // console.log(reason);
      dispatch({
        type: LOGIN_FAILURE,
        payload: reason,
      })
    });

  }
}

const initialState = {
  isAuthenticated: false,
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

}

export default function auth(state = initialState, action){
  const reduceFn = actionsMap[action.type];
  return reduceFn ? reduceFn(state, action) : state;
}


