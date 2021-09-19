import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@Header';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Header />
    </HelmetProvider>
  </React.StrictMode>,
  document.querySelector('#root')
);
