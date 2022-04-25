import axios from 'axios';
import { baseUrl } from '../constants';

const Axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: baseUrl,
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error(error);
  }
);

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new Error(error);
  }
);

export default Axios;
