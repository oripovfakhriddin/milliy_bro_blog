import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import './index.css'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <ToastContainer autoClose={1500} />
    <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
