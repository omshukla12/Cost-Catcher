import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getAmazonData } from '../middleware/getAmazonData';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyProduct() {
    // Get Product Link
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productLink = queryParams.get('productLink');

    const [productData, setProductData] = useState(null);
    const [hitPrice, setHitPrice] = useState(''); // State to store the user's input for hit price
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        function extractProductID(url) {
            const match = url.match(/\/dp\/([A-Z0-9]+)/);
            return match ? match[1] : null;
        }

        const fetchProductData = async () => {
            if (productLink) {
                // const productId = productLink.split("/")[4];
                const productId = extractProductID(productLink);
                const data = await getAmazonData(productId);
                if (data) {
                    setProductData(data);
                } else {
                    setError("Failed to fetch product data.");
                }
            }
        };
        fetchProductData();
    }, [productLink]);

    const handleTrackProduct = async () => {

        if (!hitPrice) {
            alert("Please enter a target price.");
            return;
        }

        const token = localStorage.getItem("token"); // Assuming you're storing JWT in localStorage

        const requestBody = {
            productTitle: productData.title,
            productLink: productLink,
            currentPrice: productData.discount_price,
            hitPrice: hitPrice
        };

        try {
            const baseEndpoint = process.env.REACT_APP_CC_API;
            const trackProductEndpoint = baseEndpoint + '/trackProduct';
            
            const response = await fetch(trackProductEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Pass JWT token
                },
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            if (response.ok) {
                // Show toast on success
                toast.success('Product Tracking Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light"
                });
                // Delay navigation to give time for the toast to show
                setTimeout(() => {
                    navigate("/trackinglist"); // Navigate to tracking list after a delay
                }, 2000); // 2-second delay before navigating
            } else {
                setError(result.message || "Error tracking product.");
            }
        } catch (err) {
            toast.error('Product Tracking Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
            });
            console.error("Error tracking product:", err);
            setError("Failed to track product.");
        }
    };

    if (error) {
        return (
            <div className='flex justify-center items-center font-inter'>
                {/* Render a single ToastContainer */}
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
                <p className='font-xl'>So, this happened while fetching information about your Product: <b>{error}</b></p>
                <Link to={'/addProduct'} className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                    Try again
                </Link>
            </div>
        )
    }

    if (!productData) {
        return <div className='flex flex-col items-center text-center'>
            <div>
                <Loading />
            </div>
        </div>;
    }

    const { title, discount_price: currentPrice, price: originalPrice, discount: currentDiscount } = productData;

    return (
        <div className='font-inter flex flex-col items-center text-center'>
            {/* Render a single ToastContainer */}
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

            <div>
                <h1 className='text-4xl font-semibold'>Verifying Product</h1>
                <p className='font-fira'>Product Link: {productLink}</p>
                <p>Title: {title}</p>
                <p>Current Price: ₹{currentPrice}</p>
                <p>Original Price: ₹{originalPrice}</p>
                <p>Discount: {currentDiscount}%</p>
            </div>
            <br />
            <div>
                <h1>If we displayed correct details above, please provide your hit price and click on <span className='font-semibold'>Track</span></h1>
            </div>

            <div>
                <form>
                    <p>When the product hits this price or lower, we will notify you.</p>
                    <div className="mt-8 flex gap-4">
                        <label htmlFor="hit-price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Product Target Price:
                        </label>
                        <input
                            type="number"
                            id="hit-price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5"
                            placeholder="₹"
                            value={hitPrice}
                            onChange={(e) => setHitPrice(e.target.value)} // Capture hit price input
                        />
                        <button
                            type="button"
                            onClick={handleTrackProduct} // Call the function to save tracking
                            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Track
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyProduct;
