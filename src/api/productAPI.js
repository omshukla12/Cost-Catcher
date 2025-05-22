import { getAmazonData } from "../middleware/getAmazonData";

export const fetchProductData = async (productId) => {
  try {
    const data = await getAmazonData(productId);
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      data: null,
      error: error.message || "Failed to fetch product data.",
    };
  }
};

export const saveProductTracking = async (productData, hitPrice) => {
  try {
    const token = localStorage.getItem("token");

    const requestBody = {
      productTitle: productData.title,
      productLink: productData.product_url,
      currentPrice: productData.deal_price,
      hitPrice: hitPrice,
      category: productData.category,
    };

    const response = await fetch(
      `${process.env.REACT_APP_CC_API}/trackProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error tracking product.");
    }

    return { success: true, result };
  } catch (error) {
    console.error("Error tracking product:", error);
    return {
      success: false,
      error: error.message || "Failed to track product.",
    };
  }
};
