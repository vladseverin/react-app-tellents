import axios from 'axios';

export const instance = axios.create({
  baseURL: `https://floating-atoll-63112.herokuapp.com/api/v1`
});

const getLocalStorage = JSON.parse(localStorage.getItem('authHeaders'));

if (getLocalStorage) {
  instance.defaults.headers.common['access-token'] = getLocalStorage['access-token'];
  instance.defaults.headers.common['client'] = getLocalStorage['client'];
  instance.defaults.headers.common['expiry'] = getLocalStorage['expiry'];
  instance.defaults.headers.common['token-type'] = getLocalStorage['token-type'];
  instance.defaults.headers.common['uid'] = getLocalStorage['uid'];
}



