import { useContext } from "react";
import { ScrollToTop } from "./utils/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VerifyOTP from "./components/VerifyOTP";
import ScrollToTopButton from "./components/ui/ScrollToTopBtn";

// Routing
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// Product Pages
// import Pricing from "./pages/Product/Pricing";
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
import Account from "./pages/Customer/Account";
import Dashboard from "./pages/Customer/Dashboard";
import AddDetails from "./pages/Customer/AddDetails";
import NewPassword from "./pages/Customer/NewPassword";
import VerifyProduct from "./pages/Customer/VerifyProduct";
import ProductDetails from "./pages/Customer/ProductDetails";
import TrackNewProduct from "./pages/Customer/TrackNewProduct";
import EditAccountDetails from "./pages/Customer/EditAccountDetails";

// Analytics Routes
// import Goals from "./pages/Customer/Analytics/Goals";
import Trends from "./pages/Customer/Analytics/Trends";
import Alerts from "./pages/Customer/Analytics/Alerts";
import Analysis from "./pages/Customer/Analytics/Analysis";
import BestDeals from "./pages/Customer/Analytics/BestDeals";
import Favorites from "./pages/Customer/Analytics/Favorites";
import TopSavings from "./pages/Customer/Analytics/TopSavings";
import Recommended from "./pages/Customer/Analytics/Recommended";
import AllProducts from "./pages/Customer/Analytics/AllProducts";
import RecentAlerts from "./pages/Customer/Analytics/RecentAlerts";
import TrendingProducts from "./pages/Customer/Analytics/TrendingProducts";

const AppLayout = () => {
  const { theme, toggleTheme, setSystemTheme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <ScrollToTop />
      <div className="App">
        <Navbar toggleTheme={toggleTheme} setSystemTheme={setSystemTheme} />
        <Outlet />
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Landing + User Auth
      {
        path: "/",
        element: (
          <PublicRoute>
            <Landing />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <Signin />
          </PublicRoute>
        ),
      },

      // Product
      // { path: "/pricing", element: <Pricing /> },
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

      // Account
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/newPassword",
        element: (
          <ProtectedRoute>
            <NewPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editAccountDetails",
        element: (
          <ProtectedRoute>
            <EditAccountDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/changePassword",
        element: (
          <ProtectedRoute>
            <VerifyOTP />
          </ProtectedRoute>
        ),
      },

      // Product
      {
        path: "/product",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      // Tracking
      {
        path: "/track-new-product",
        element: (
          <ProtectedRoute>
            <TrackNewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/verify-product",
        element: (
          <ProtectedRoute>
            <VerifyProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tracking-list",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addProduct",
        element: (
          <ProtectedRoute>
            <TrackNewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addProduct/addDetails",
        element: (
          <ProtectedRoute>
            <AddDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addProduct/verifyProduct",
        element: (
          <ProtectedRoute>
            <VerifyProduct />
          </ProtectedRoute>
        ),
      },

      // Analytics
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allproducts",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/analysis",
        element: (
          <ProtectedRoute>
            <Analysis />
          </ProtectedRoute>
        ),
      },
      {
        path: "/alerts",
        element: (
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/trends",
        element: (
          <ProtectedRoute>
            <Trends />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deals",
        element: (
          <ProtectedRoute>
            <BestDeals />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/goals",
      //   element: (
      //     <ProtectedRoute>
      //       <Goals />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/topsavings",
        element: (
          <ProtectedRoute>
            <TopSavings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recentalerts",
        element: (
          <ProtectedRoute>
            <RecentAlerts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/trendingProducts",
        element: (
          <ProtectedRoute>
            <TrendingProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recommended",
        element: (
          <ProtectedRoute>
            <Recommended />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
