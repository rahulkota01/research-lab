import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("%c RO ECOSYSTEM LOADED ", "background: #222; color: #00D4FF; font-size: 20px; font-weight: bold;");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
