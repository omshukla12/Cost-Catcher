import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import "./Modal.css"; // Import external CSS for styling
import edit from './assets/edit.svg';
import { useNavigate } from "react-router-dom";

const Edit = ({ productId, currentHitPrice, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newHitPrice, setNewHitPrice] = useState(currentHitPrice);
    const [error, setError] = useState(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setError(null); // Reset error when toggling modal
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Get JWT token if needed

            const response = await fetch(`https://cost-catcher-react.vercel.app/api/trackinglist/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the token if required by your backend
                },
                body: JSON.stringify({ newHitPrice })
            });

            const result = await response.json();

            if (response.ok) {
                onEdit(productId, newHitPrice); // Update the parent component with new hitPrice
                // toast.success("Target price updated successfully!"); // Show success toaster immediately after successful update
                // setTimeout(() => toggleModal(), 100); // Delay closing modal slightly to ensure toast is visible
                alert("Price Updated Successfully")
                

                // Refresh the page after a short delay to ensure toast is visible
                setTimeout(() => {
                    navigate("/home");
                }, 2000);

            } else {
                setError(result.message || 'Failed to update target price');
                alert("Failed: ", result.message);
            }
        } catch (err) {
            console.error("Error updating price:", err);
            setError("Error updating target price.");
        }
    };

    return (
        <div className="App font-inter">

            

            <button onClick={toggleModal} className='flex items-center bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded'>
                <img src={edit} alt="Edit" className='w-5 h-5 mr-2 filter-white' />
                <a href='#'>Edit Target Price</a>
            </button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="m-2 font-semibold text-xl">Edit Target Price</h2>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <label className="mx-2">
                                    New Target Price:
                                </label>
                                <input
                                    type="number"
                                    name="newPrice"
                                    value={newHitPrice} // Bind input value to state
                                    onChange={(e) => setNewHitPrice(e.target.value)} // Update state on input change
                                    className="p-2 border border-gray-700 rounded w-24"
                                    placeholder="₹"
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit" className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">Update</button>
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

export default Edit;
