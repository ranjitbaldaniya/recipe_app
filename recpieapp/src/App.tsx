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
import Homepage from './UserLayout/components/Homepage';
import Contact from './UserLayout/components/Pages/Contact';
import Aboutus from './UserLayout/components/Pages/Aboutus';
import Recpies from './UserLayout/components/Pages/Recpies';
import Login from './components/Admin/Login';
import UserLayout from './layout/UserLayout';
import { useAuth } from './hooks/useAuth';
import Calendar from './pages/Calendar';
import ListRecipe from './components/Admin/recipe/ListRecipe';
import AddRecipe from './components/Admin/recipe/AddRecipe';
import AddCategory from './components/Admin/category/AddCategory';
import ListCategory from './components/Admin/category/ListCategory';
import RecipeDetails from './UserLayout/components/Pages/RecipeDetails';
import Footer from './UserLayout/components/Footer';
import Navbar from './UserLayout/components/Navbar';
import MyRecipe from './UserLayout/components/MyRecipe';
import AddUserRecipe from './UserLayout/components/AddUserRecipe';
import MyFavorite from './UserLayout/components/MyFavorite';
import NotFound from './UserLayout/components/NotFound';
import AdminReviews from './components/Admin/Review/AdminReview';
import ForgotPassword from './UserLayout/components/Pages/ForgotPassword';

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
          <Route path="/" index element={
            <>
            <PageTitle title="Home page" />
            <Homepage />
            </>
            } />
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
          <Route
            path="/forgot-password"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <PageTitle title="Contact" />
                <Contact />
              </>
            }
          />
          <Route
            path="/aboutus"
            element={
              <>
               <PageTitle title="About" />
                <Aboutus />
              </>
            }
          />
          <Route
            path="/user-recpie"
            element={
              <>
                <PageTitle title="Recipe" />
                <Recpies />
              </>
            }
          />
          {/* recipe details route which is going to be private in user deshboard */}
          <Route
            path="/recipe/details"
            element={
              <>
                <PageTitle title="Recipe Detail" />
                <Recpies />
              </>
            }
          />
          <Route path="/notfound"  element={<NotFound />} />
        </Routes>
      </UserLayout>
    );
  }

  if (token && user?.role === 'user') {
    return (
      <UserLayout>
        {/* User Private Routes */}
        <Routes>
        <Route path="/" index element={
           <>
           <PageTitle title="Home page" />
           <Homepage />
           </>
           } />
        <Route
            path="/contact"
            element={
              <>
               <PageTitle title="Contact" />
                <Contact />
              </>
            }
          />
          <Route
            path="/aboutus"
            element={
              <>
               <PageTitle title="About" />
                <Aboutus />
              </>
            }
          />
          <Route
            path="/recipes"
            element={
              <UserPrivateRoute>
                <PageTitle title="Recipe" />
                <Chart />
              </UserPrivateRoute>
            }
          />
        <Route
          path="/myrecipe"
          element={
            <>
              <PageTitle title="My Recipe" />
              <Navbar />
              <MyRecipe />
              <Footer />
              </>
          }
        />
         <Route
          path="/favorites"
          element={
            <>
              <PageTitle title="Favorites" />
              <Navbar />
              <MyFavorite />
              <Footer />
              </>
          }
        />
             <Route
          path="/add-recipe"
          element={
            <>
              <PageTitle title="Add Recipe" />
              <Navbar />
              <AddUserRecipe />
              <Footer />
              </>
          }
        />

          <Route
            path="/recipe/details/:id"
            element={
              <>
                <PageTitle title="Recipe Details" />
                <RecipeDetails />
              </>
            }
          />
        <Route path="/notfound"  element={<NotFound />} />
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
          path="/admin/add-category"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddCategory />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/add-category/:id"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddCategory />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/list-category"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ListCategory />
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
          path="/admin/list-recipe"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ListRecipe />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/add-recipe"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddRecipe />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/review"
          element={
            <AdminPrivateRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AdminReviews />
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
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
