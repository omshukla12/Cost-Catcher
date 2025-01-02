import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Avatar from "react-avatar";
import { jwtDecode } from "jwt-decode";

// Function to get the userId from the JWT
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

  const accountId = getUserIdFromToken();

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
    <div className="font-inter min-h-screen flex flex-col justify-center items-center w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-4">
        <Avatar name={accountDetails.name} size="100" round />
        <h2 className="text-2xl font-semibold text-gray-800">
          {accountDetails.name}
        </h2>
      </div>

      <div className="w-full max-w-xl mt-8 space-y-8">
        {/* Contact Info Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800">Contact Info</h3>
          <div className="space-y-4 mt-4">
            <div className="grid gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={accountDetails.email}
                className="w-full h-10 px-3 border rounded-md text-sm"
                readOnly
              />
            </div>
            <div className="grid gap-1">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600"
              >
                Whatsapp Number
              </label>
              <input
                id="phone"
                type="tel"
                value={accountDetails.phone}
                className="w-full h-10 px-3 border rounded-md text-sm"
                readOnly
              />
            </div>
            <div className="grid gap-1">
              <label
                htmlFor="telegram"
                className="text-sm font-medium text-gray-600"
              >
                Telegram Username
              </label>
              <input
                id="telegram"
                type="text"
                value="@AnuragDubey"
                className="w-full h-10 px-3 border rounded-md text-sm"
                readOnly
              />
            </div>
          </div>
          <div className="grid gap-1 text-center">
            <a
              href="/editAccountDetails"
              className="bg-black text-white w-1/3 px-4 py-2 rounded-md mt-4 text-sm hover:bg-gray-800"
              // style={{ width: 'auto' }}
            >
              Edit Details
            </a>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5 text-muted-foreground mr-2"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-800">Security</h3>
          </div>
          <div className="space-y-4 mt-4">
            <div className="grid gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value="***********"
                className="w-full h-10 px-3 border rounded-md text-sm"
                readOnly
              />
            </div>
            <div className="grid gap-1 text-center">
              <a
                href="/changePassword"
                className="bg-black text-white w-1/3 px-4 py-2 rounded-md mt-4 text-sm hover:bg-gray-800"
                // style={{ width: 'auto' }}
              >
                Change Password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
