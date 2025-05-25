import { jwtDecode } from "jwt-decode";

// Extracting user details from JWT ...
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    const { name, email, userId } = decoded;

    return { name, email, userId };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Fetching user tracking list ...
export const fetchTrackingList = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please sign in.");
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_CC_API}/trackinglist`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (response.ok) {
      return result.trackinglist || [];
    } else {
      throw new Error(result.message || "Failed to fetch tracking list.");
    }
  } catch (error) {
    console.error("Error fetching tracking list:", error);
    throw error;
  }
};

// Fetching user activity data ...
export const fetchActivityData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please sign in.");
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_CC_API}/activity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status === "Success") {
      return data.payload;
    } else {
      throw new Error(data.message || "Failed to fetch activity data.");
    }
  } catch (error) {
    console.error("Error fetching activity data:", error);
    throw error;
  }
};

// Fetch upcoming deals ...
export const fetchUpcomingSales = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please sign in.");
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_CC_API}/upcomingSales`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (response.ok) {
      return result.payload;
    } else {
      console.error("Failed to fetch upcoming sales.:", result.message);
      return result.message;
    }
  } catch (err) {
    console.error("Failed to fetch upcoming sales.:", err);
    throw err;
  }
};

// Fetch price history of given product by ID ...
export const fetchPriceHistory = async (pid) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please sign in.");
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_CC_API}/tracklist/products/${pid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (response.ok) {
      return result.priceHistory || [];
    } else {
      throw new Error(result.message || "Failed to fetch price history.");
    }
  } catch (error) {
    console.error("Error fetching price history :", error);
    throw error;
  }
};
