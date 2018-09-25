import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import { getSkills } from '../reducers/skills';

export default function configureStore() {
  if (process.env.NODE_ENV === 'production') {
    const store = createStore(rootReducer);
    return store;
  }

  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

  window.store = store;
  window.getSkills = getSkills;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}