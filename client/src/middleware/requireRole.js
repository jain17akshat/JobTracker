import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <h1>403 - Access Denied</h1>;

  return children;
};

export default RequireRole;
