import Axios from 'axios';
import router from '../router';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : '//localhost:3030/api';

var axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint, data, params) {
    return ajax(endpoint, 'GET', data, params);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(endpoint, method, data = null, params = {}) {
  console.log('data', data);
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      params: method === 'GET' ? params : null,
    });
    return res.data;
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${BASE_URL}${endpoint}, with data:`, data);
    console.dir(err);
    // if (err.response && err.response.status === 401) {
    //     // Depends on routing startegy - hash or history
    //     // window.location.assign('/#/login')
    //     // window.location.assign('/login')
    //     router.push('/login');
    // }
    throw err;
  }
}
