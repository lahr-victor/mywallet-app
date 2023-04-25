// PACKAGE IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';

// VALUE IMPORTS
import App from './components/App';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';

// GLOBAL CONSTANTS
const root = ReactDOM.createRoot(document.getElementById('root'));

// FUNCTIONS
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
