import { jwtDecode } from "jwt-decode";
// import { AuthContext } from "../../context/AuthContext";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    const { name, email } = decoded;

    return { name, email };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

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
