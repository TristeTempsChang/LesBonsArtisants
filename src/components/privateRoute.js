import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/authentication" replace />
  );
}

export default PrivateRoute;