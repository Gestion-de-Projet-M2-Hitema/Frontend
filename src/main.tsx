import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use((config) => {
  let cookie = Cookies.get("jwt")
  if (cookie) config.headers["authorization"] = "Bearer " + cookie;
  return config;
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
