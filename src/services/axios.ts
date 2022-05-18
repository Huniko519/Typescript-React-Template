import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

/**
 * Request interceptors
 */
axiosInstance.interceptors.request.use((config) => {
  const jwtToken = window.localStorage.getItem('login');

  if (jwtToken && config.headers) {
    config.withCredentials = true;
    // config.headers['Cookie'] = `session=${jwtToken}`;

    config.headers['api-key'] = 'test';
  }

  return config;
});

export default axiosInstance;
