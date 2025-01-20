import React, { useContext } from "react";
import { ScrollToTop } from "./utils/ScrollToTop";
import { ThemeProvider, ThemeContext } from "./utils/ThemeContext";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// Product Pages
import Pricing from "./pages/Product/Pricing";
import Features from "./pages/Product/Features";

// Company Pages
import About from "./pages/Company/About";
import Contact from "./pages/Company/Contact";

// Resource Pages
import HelpCenter from "./pages/Resources/HelpCenter";

// Legal Pages
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";

// Customer Routes
import Home from "./pages/Customer/Home";
import Account from "./pages/Customer/Account";
import AddDetails from "./pages/Customer/AddDetails";
import NewPassword from "./pages/Customer/NewPassword";
import TrackingList from "./pages/Customer/TrackingList";
import VerifyProduct from "./pages/Customer/VerifyProduct";
import ProductDetails from "./pages/Customer/ProductDetails";
import TrackNewProduct from "./pages/Customer/TrackNewProduct";
import EditAccountDetails from "./pages/Customer/EditAccountDetails";

// Components
import VerifyOTP from "./components/VerifyOTP";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = () => {
  const { theme, toggleTheme, setSystemTheme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <ScrollToTop />
      <div className="App">
        <Navbar toggleTheme={toggleTheme} setSystemTheme={setSystemTheme} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing /> },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },

      // Product
      { path: "/pricing", element: <Pricing /> },
      { path: "/features", element: <Features /> },

      // Company
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },

      // Resources
      { path: "/help", element: <HelpCenter /> },

      // Legal
      { path: "/terms", element: <TermsOfService /> },
      { path: "/privacy", element: <PrivacyPolicy /> },

      // Customer
      { path: "/account", element: <Account /> },
      { path: "/newPassword", element: <NewPassword /> },
      { path: "/changePassword", element: <VerifyOTP /> },
      { path: "/trackinglist", element: <TrackingList /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/addProduct", element: <TrackNewProduct /> },
      { path: "/addProduct/addDetails", element: <AddDetails /> },
      { path: "/editAccountDetails", element: <EditAccountDetails /> },
      { path: "/addProduct/verifyProduct", element: <VerifyProduct /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
