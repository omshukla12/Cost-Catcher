import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackNewProduct from './pages/TrackNewProduct';
import AddDetails from './pages/AddDetails';
import VerifyProduct from './pages/VerifyProduct';
import TrackingList from './pages/TrackingList';
import ProductDetails from './pages/ProductDetails';
import Account from './pages/Account';
import EditAccountDetails from './pages/EditAccountDetails';
import VerifyOTP from './components/VerifyOTP';
import NewPassword from './pages/NewPassword';

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="App">
        <Navbar setDarkMode={setDarkMode} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Landing /> },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: '/signup', element: <Signup /> },
      { path: '/signin', element: <Signin /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/account', element: <Account /> },
      { path: '/editAccountDetails', element: <EditAccountDetails /> },
      { path: '/changePassword', element: <VerifyOTP /> },
      { path: '/newPassword', element: <NewPassword /> },
      { path: '/product/:id', element: <ProductDetails /> },
      { path: '/addProduct', element: <TrackNewProduct /> },
      { path: '/addProduct/addDetails', element: <AddDetails /> },
      { path: '/addProduct/verifyProduct', element: <VerifyProduct /> },
      { path: '/trackinglist', element: <TrackingList /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
