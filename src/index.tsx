import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const ncpClientId: string = process.env.REACT_APP_NAVER_KEY || '';
root.render(
  <RecoilRoot>
    <NavermapsProvider ncpClientId={ncpClientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NavermapsProvider>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
