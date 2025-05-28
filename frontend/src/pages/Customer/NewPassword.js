import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

import { getUserFromToken } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

const NewPassword = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setSuccess("");
      setLoading(false);
      return;
    }

    try {
      const { userId } = getUserFromToken();

      const response = await fetch(
        `${process.env.REACT_APP_CC_API}/updatePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ accountId: userId, password: newPassword }),
        }
      );

      if (response.ok) {
        setSuccess("Password updated successfully!");
        setError("");
        setNewPassword("");
        setConfirmPassword("");

        toast.success("Password updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        // Delay navigation to give time for the toast to show
        setTimeout(() => {
          navigate("/account"); // Navigate back to account page
        }, 2000);
      } else {
        const result = await response.json();

        setError(result.message || "Failed to update password.");
        setSuccess("");

        toast.error("Failed to update Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (err) {
      setError("Some error occurred. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter min-h-screen bg-gray-100 dark:bg-gray-900 text-foreground transition-colors duration-300">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/account" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-orange-500 focus:outline-none" />
            </Link>
            <h1 className="text-2xl font-bold">Change Password</h1>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-gradient-to-b from-orange-500 to-orange-400 dark:from-blue-700 dark:to-blue-500 pt-12 pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-4">
            <Lock className="h-12 w-12 text-orange-500 dark:text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Update Your Password
          </h1>
          <p className="text-orange-100 dark:text-blue-200">
            Choose a strong password to keep your account secure
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-2xl mx-auto px-4 -mt-16 pb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* New Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    {success}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
                <Link
                  to="/account"
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Password Security Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use a combination of uppercase and lowercase letters, numbers, and
              symbols
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Avoid using personal information like names, birthdays, or common
              words
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Consider using a password manager to generate and store strong
              passwords
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
