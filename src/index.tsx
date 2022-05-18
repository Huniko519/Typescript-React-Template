// /** @jsxImportSource @emotion/react */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ReactNotifications } from 'react-notifications-component';
import AppContexts from 'contexts/AppContext';
import GlobalStyles from 'components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'react-notifications-component/dist/theme.css';
import './assets/styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ReactNotifications />
    <AppContexts>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </AppContexts>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
