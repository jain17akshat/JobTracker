import { Link, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <div>Welcome, {user?.name || 'User'}</div>
        <div>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
