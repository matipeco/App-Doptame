import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
// import { Auth0Provider } from '@auth0/auth0-react';
// import env from 'react-dotenv'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




root.render(
  <Provider store={store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </Provider>
);
