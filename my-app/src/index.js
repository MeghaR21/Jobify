import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';  // Your custom CSS
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';  // Bootstrap CSS
import reportWebVitals from './reportWebVitals';  // Web vitals for performance metrics

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();  // Optional performance metrics