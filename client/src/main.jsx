import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from './store/index.js'
import AuthProvider from './context/AuthProvider'
import ThemeProvider from './context/ThemeProvider'

import App from './App.jsx'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <AuthProvider>
        <ThemeProvider>

          <App />

        </ThemeProvider>
      </AuthProvider>
    </Router>
  </Provider>
)