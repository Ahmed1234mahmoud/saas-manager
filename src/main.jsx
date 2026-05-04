import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize dark mode based on system preference
const initDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
};

initDarkMode();

// شيلنا React.StrictMode عشان مكتبة @hello-pangea/dnd تشتغل بسلاسة في البيئة التطويرية
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)