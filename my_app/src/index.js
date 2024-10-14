import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Your custom CSS
import 'bootstrap/dist/css/bootstrap.css';  // Bootstrap CSS
import reportWebVitals from './reportWebVitals';  // Web vitals for performance metrics
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
