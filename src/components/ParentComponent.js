import { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";

const ParentComponent = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/tracklist/products/${productId}`,
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
          setProduct(result);
        } else {
          setError(result.message || "Failed to fetch product.");
        }
      } catch (err) {
        console.error("Error fetching product : ", err);
        setError("Error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return product ? (
    <ProductDetails product={product} />
  ) : (
    <p>Product not found.</p>
  );
};

export default ParentComponent;
