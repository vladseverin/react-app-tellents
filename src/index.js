import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import './index.css';
import '../node_modules/toastr/build/toastr.min.css'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store} >
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}

registerServiceWorker();
