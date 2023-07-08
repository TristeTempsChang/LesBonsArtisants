import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import SignIn from './components/Authentication';
import SignUp from './components/Register';
import ActionPage from './components/ActionPage';

function AppRoutes() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/authentication" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {isAuthenticated ? (
        <Route path="/home" element={<ActionPage />} />
      ) : (
        <Route path="/authentication" element={<SignIn />} />
      )}
    </Routes>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
