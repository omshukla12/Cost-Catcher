import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Save, X, ArrowLeft } from "lucide-react";

import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";
import { getUserFromToken } from "../../services/authService";

const EditAccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState(null);
  const [newDetails, setNewDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [detailError, setDetailError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { setUser } = useContext(AuthContext);
  const { userId } = getUserFromToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setError("Unauthorized access. Please login.");
      return;
    }

    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/account/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAccountDetails(data.payload);
          setNewDetails({
            name: data.payload.name,
            email: data.payload.email,
            phone: data.payload.phone,
          });
        } else {
          setError(data.message || "Failed to fetch account details");
        }
      } catch (error) {
        setError("Error fetching account details");
      }
    };

    fetchAccountDetails();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setDetailError(null);

    try {
      const token = localStorage.getItem("token");
      console.log("Payload being sent:", newDetails);

      const response = await fetch(
        `${process.env.REACT_APP_CC_API}/editAccountDetails/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newDetails),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Updating user details in global context ...
        setUser({
          ...accountDetails,
          ...newDetails,
        });

        alert("Details updated successfully!");
        setAccountDetails(newDetails);
        setTimeout(() => {
          navigate("/account");
        }, 2000);
      } else {
        setDetailError(result.message || "Updation failed");
        alert("Failed to update account details : ", result.message);
      }
    } catch (error) {
      console.error("This error occurred : ", error);
      setDetailError("Error updating account details.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!userId || error) {
    return <div>{error || "Unauthorized access. Please login."}</div>;
  }

  if (!accountDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your account details and preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-500" />
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Update your personal details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                      htmlFor="name"
                    >
                      <User className="h-4 w-4" />
                      Full Name
                    </label>
                    <input
                      className="flex h-11 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      id="name"
                      name="name"
                      value={newDetails.name}
                      onChange={(e) =>
                        setNewDetails({ ...newDetails, name: e.target.value })
                      }
                      placeholder={accountDetails.name}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                      htmlFor="email"
                    >
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      className="flex h-11 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      id="email"
                      name="email"
                      type="email"
                      value={newDetails.email}
                      onChange={(e) =>
                        setNewDetails({ ...newDetails, email: e.target.value })
                      }
                      placeholder={accountDetails.email}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                      htmlFor="phone"
                    >
                      <Phone className="h-4 w-4" />
                      WhatsApp Number
                    </label>
                    <input
                      className="flex h-11 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      id="phone"
                      name="phone"
                      type="tel"
                      value={newDetails.phone}
                      onChange={(e) =>
                        setNewDetails({ ...newDetails, phone: e.target.value })
                      }
                      placeholder={accountDetails.phone || "+91 00000 00000"}
                    />
                  </div>

                  {/* Error Message */}
                  {detailError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {detailError}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white rounded-md text-sm font-medium h-11 px-6 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <Link
                      to="/account"
                      className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium h-11 px-6 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Current Details</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {accountDetails.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                    <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {accountDetails.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {accountDetails.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                  If you're having trouble updating your account, our support
                  team is here to help.
                </p>
                <Link to="/contact">
                  <button className="w-full bg-orange-500 text-white rounded-md text-sm font-medium h-9 px-4 hover:bg-orange-600 transition-colors">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountDetails;
