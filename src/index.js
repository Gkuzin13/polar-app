import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './Auth';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
