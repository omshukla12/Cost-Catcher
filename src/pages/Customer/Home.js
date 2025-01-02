import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct named import
import Loading from "../../components/Loading";

// SVGs
import edit from "../../components/assets/edit.svg";
import trash from "../../components/assets/trash.svg";

const Home = () => {
  const [user, setUser] = useState(null);
  const [trackingItems, setTrackingItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      const decoded = jwtDecode(token); // Decode token and get the user's name
      setUser(decoded); // Now, user will contain both name and email
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTrackingList = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage

        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/trackinglist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include JWT token in the headers
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setTrackingItems(result.trackinglist); // Assuming the tracklist is returned
        } else {
          setError(result.message || "Failed to fetch tracking list.");
        }
      } catch (err) {
        console.error("Error fetching tracking list:", err);
        setError("Error fetching tracking list.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTrackingList();
  }, []);

  if (loading) {
    return <Loading />; // Display a loading spinner while fetching
  }

  return (
    <div className="font-inter">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl">
            Hello <b>{user.name}</b>, welcome to your dashboard!
          </h1>
          <div>
            <p>Your current Tracking List</p>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-center text-center p-4 border border-gray-500 h-auto w-auto rounded">
            {trackingItems.length > 0 ? (
              <ul className="space-y-4">
                {trackingItems.map((item, index) => (
                  <li key={index} className="border p-4 rounded-md shadow">
                    <div>
                      <h2 className="text-lg">
                        Product Title: {item.productTitle}
                      </h2>
                      <h2 className="text-lg">
                        Product Link: {item.productLink}
                      </h2>
                      <h3 className="font-semibold">
                        Current Price: ₹{item.currentPrice}
                      </h3>
                      <h4 className="font-semibold">
                        Target Price: ₹{item.hitPrice}
                      </h4>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-2">
                      <button className="flex items-center bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                        <img
                          src={edit}
                          alt="Edit"
                          className="w-5 h-5 mr-2 filter-white"
                        />
                        <a href="/edit">Edit Target Price</a>
                      </button>
                      <button className="flex items-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded">
                        <img
                          src={trash}
                          alt="Delete"
                          className="w-5 h-5 mr-2 filter-white"
                        />
                        <a href="/delete">Delete This Product</a>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">
                <h2 className="text-xl font-semibold mt-4">Wow, such empty</h2>
              </div>
            )}
          </div>
          <div className="flex mt-6">
            <p className="p-2">Want to track another product?</p>
            <a
              href="/addProduct"
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Track a new Product
            </a>
          </div>
        </div>
      ) : (
        <p>
          <Loading />
        </p>
      )}
    </div>
  );
};

export default Home;
