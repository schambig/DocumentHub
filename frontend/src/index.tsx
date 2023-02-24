import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
//import AppV1 from './pages/CoreAppV1'
//import { AppBusqueda } from './pages/CoreBusqueda'
//import { AppFile } from './pages/CoreFile'
//import { AppProfile } from './pages/CoreProfile'
//import { AppUser } from './pages/CoreUsers'
import  AppRoutes from './pages/CoreAppRoutes'
import reportWebVitals from './reportWebVitals';
import { ThemeConfig } from './config/theme.condig';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeConfig>
      <div >
      <AppRoutes />
      </div>
    </ThemeConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
