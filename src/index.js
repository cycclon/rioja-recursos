import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Carga from './componentes/Carga';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Carga />}>
      <BrowserRouter>
        <ToastContainer position='top-right' theme="dark"/>  
        <App />        
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);