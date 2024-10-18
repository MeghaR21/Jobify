import axios from 'axios'

export const instance = axios.create({ // 
  baseURL: process.env.REACT_APP_API_ROUTE,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add a request interceptor to include the token
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Adjust this based on where you store your token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
