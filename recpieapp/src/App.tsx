import { useEffect, useState, ReactNode } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';
import Login from './components/Admin/Login';
import UserLayout from './layout/UserLayout';
import { useAuth } from './hooks/useAuth';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

// Private Route Component for Users
const UserPrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();

  return token && user?.role === 'user' ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

// Private Route Component for Admins
const AdminPrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user } = useAuth();

  return token && user?.role === 'admin' ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const { token, user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return (
      <UserLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" index element={<h2>Home page</h2>} />
          <Route
            path="/admin/login"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Login />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserLayout>
    );
  }

  if (token && user?.role === 'user') {
    return (
      <UserLayout>
        {/* User Private Routes */}
        <Routes>
          <Route
            path="/recipes"
            element={
              <UserPrivateRoute>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </UserPrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserLayout>
    );
  }

  return (
    <DefaultLayout>
      <Routes>
        {/* Admin Private Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/subcategory"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/recipes"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </AdminPrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
