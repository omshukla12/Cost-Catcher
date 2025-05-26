import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Mail,
  Phone,
  MessageSquare,
  Lock,
  Edit,
  ArrowLeft,
  Bell,
  ExternalLink,
} from "lucide-react";

import Loading from "../../components/Loading";
import NewAvatar from "../../components/ui/NewAvatar";
import { getUserFromToken } from "../../services/authService";

const Account = () => {
  const { userId } = getUserFromToken();
  const telegramBotUrl = process.env.REACT_APP_TELE_BOT_URL || "#";

  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetching user account details ...
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/account/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAccountDetails(data.payload);
        } else {
          setError(data.message || "Failed to fetch account details.");
        }
      } catch (error) {
        setError("Error fetching account details : ", error);
      }
    };

    fetchAccountDetails();
  }, [userId]);

  if (!accountDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Error: {error}
    </div>;
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
              <Link
                to="/editAccountDetails"
                className="flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
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
              <Link
                to="/changePassword"
                className="flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Edit className="h-4 w-4 mr-1" />
                Change
              </Link>
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

        {/* Telegram Notifications */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-4">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Enable Telegram Notifications
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Get instant updates and alerts directly on Telegram
                  </p>
                </div>
              </div>
              <a
                href={telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center"
              >
                Set Up Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
