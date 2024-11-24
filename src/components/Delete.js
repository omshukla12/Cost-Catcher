import React, { useState } from "react";
import "./Modal.css"; // Import external CSS for styling
import trash from './assets/trash.svg';
import { useNavigate } from "react-router-dom";

const Delete = ({ productId, productTitle, onDelete }) => {

    // console.log(productId, productTitle)

    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`https://cost-catcher-react.vercel.app/api/trackinglist/delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                alert("Product Deleted Successfully");
                toggleModal(); // Close modal after deletion
                onDelete(productId); // Notify parent component of the deletion
                setTimeout(() => {
                    navigate("/trackinglist"); // Navigate to tracking list after a delay
                }, 2000); // 2-second delay before navigating
            } else {
                setError(result.message || "Deletion failed");
            }
        } catch (error) {
            console.log("Error", error);
            setError("Error while deleting the product");
        }
    };

    return (
        <div className="App font-inter">
            <button className='flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded'
                onClick={toggleModal}>
                <img src={trash} alt="Delete" className='w-5 h-5 mr-2 filter-white' />
                <a href='#'>Delete This Product</a>
            </button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="font-semibold text-xl my-2">Delete a Product</h2>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <label>
                                    <b>Title:</b> <span>{productTitle}</span>
                                </label>
                            </div>

                            {error && <p className="text-red-500">{error}</p>}

                            <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded" type="submit">
                                Delete
                            </button>
                            <button type="button" onClick={toggleModal} className="text-black font-semibold py-2 px-4 mx-2 border rounded">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Delete;
