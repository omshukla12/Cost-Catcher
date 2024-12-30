import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const priceHistory = [
    { date: "2 Oct", Price: 8999 },
    { date: "4 Oct", Price: 9999 },
    { date: "6 Oct", Price: 9999 },
    { date: "8 Oct", Price: 10499 },
    { date: "10 Oct", Price: 10999 },
    { date: "12 Oct", Price: 8999 },
    { date: "14 Oct", Price: 8499 },
    { date: "16 Oct", Price: 9999 },
    { date: "18 Oct", Price: 10499 },
    { date: "20 Oct", Price: 11999 },
  ];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CC_API}/tracklist/products/${id}`
        ); // Fetch product by ID
        const data = await response.json();
        if (response.ok) {
          setProduct(data); // Set product data
        } else {
          setError(data.message || "Failed to fetch product details");
        }
      } catch (err) {
        setError("Error fetching product details");
      }
    };

    fetchProductDetails();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="font-inter">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column with Chart (removed Image) */}
            <div className="flex flex-col gap-6">
              {/* Chart */}
              <div className="w-full p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="Price"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column with Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-10">
                {product.productTitle}
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">
                  Current Price ₹{product.currentPrice}
                </div>
                <div className="text-4xl text-muted-foreground">
                  Target Price ₹{product.hitPrice}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  Edit
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                  color="danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
