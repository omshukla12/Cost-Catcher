import React, { useEffect, useState } from "react";

const TrackingList = () => {
  const [trackingItems, setTrackingItems] = useState([]);
  const [error, setError] = useState(null);
  const user = "Anurag Dubey";

  useEffect(() => {
    const fetchTrackingList = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage

        const response = await fetch(
          process.env.REACT_APP_TRACKING_LIST_URI,
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
      }
    };

    fetchTrackingList();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (trackingItems.length === 0) {
    return <div>No items in your tracking list.</div>;
  }

  return (
    <div className="flex flex-col items-center font-inter">
      <div>
        <h1 className="font-semibold text-2xl">{user}'s Tracking List</h1>
      </div>
      <div>
        <ul className="gap-4 p-2 m-2">
          {trackingItems.map((item, index) => (
            <li key={index} className="border rounded shadow p-4 space-y-2 m-4">
              <h2>Product Title: {item.productTitle}</h2>
              <h2>Product Link: {item.productLink}</h2>
              <h3>Current Price: ₹{item.currentPrice}</h3>
              <h4>Target Price: ₹{item.hitPrice}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackingList;
