import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import { signup, login } from '../reducers/auth';

export default function configureStore() {
  if (process.env.NODE_ENV === 'production') {
    const store = createStore(rootReducer);
    return store;
  }

  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

  window.store = store;
  window.signup = signup;
  window.login = login;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}