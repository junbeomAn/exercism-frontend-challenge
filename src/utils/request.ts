import axios from 'axios';

const url = `https://exercism.org/api/v2`;

const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: url,
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw new Error(error);
  }
);

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    throw new Error(error);
  }
);

export default Axios;
