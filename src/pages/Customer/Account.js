import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import {
  Mail,
  Phone,
  MessageSquare,
  Lock,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import NewAvatar from "../../components/ui/NewAvatar";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};

const Account = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState(null);

  // State to track scroll direction
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const accountId = getUserIdFromToken();

  // Handle scroll events to determine direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle fetching of account details
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/account/${accountId}`
        );
        const data = await response.json();
        if (response.ok) {
          setAccountDetails(data.payload);
        } else {
          setError(data.message || "Failed to fetch account details");
        }
      } catch (error) {
        setError("Error fetching account details");
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  if (!accountDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="font-inter min-h-screen bg-gray-100 dark:bg-gray-900 text-foreground transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
            </Link>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-gradient-to-b from-orange-500 to-orange-400 dark:from-blue-700 dark:to-blue-500 pt-12 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg mb-4">
            <NewAvatar
              name={accountDetails.name}
              size={100}
              round
              className="border-4 border-white dark:border-gray-800"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {accountDetails.name}
          </h1>
          <p className="text-orange-100 dark:text-orange-200">
            Account Settings
          </p>
        </div>
      </div>

      {/* Content Cards */}
      <div className="max-w-3xl mx-auto px-4 -mt-16 space-y-6 pb-12">
        {/* Contact Info Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Contact Info
                </h3>
              </div>
              <a
                href="/editAccountDetails"
                className="flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </a>
            </div>

            <div className="space-y-4">
              <div className="grid gap-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-800 dark:text-gray-200">
                    {accountDetails.email}
                  </span>
                </div>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  WhatsApp Number
                </label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-800 dark:text-gray-200">
                    {accountDetails.phone}
                  </span>
                </div>
              </div>

              <div className="grid gap-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Telegram Username
                </label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2">
                  <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-800 dark:text-gray-200">
                    @AnuragDubey
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Security
                </h3>
              </div>
              <a
                href="/changePassword"
                className="flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Edit className="h-4 w-4 mr-1" />
                Change
              </a>
            </div>

            <div className="space-y-4">
              <div className="grid gap-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Password
                </label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2">
                  <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-800 dark:text-gray-200">
                    ••••••••••
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
