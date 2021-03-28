import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Global, css } from '@emotion/react';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
        }
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
