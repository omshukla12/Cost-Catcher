import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to get the userId from the JWT
const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");// Adjust "token" to match your token's key name in localStorage

    // console.log(token)
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.userId; // Access the userId property from the decoded token payload
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }
    return null;
};


const NewPassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setSuccess('');
            return;
        }

        try {

            const accountId = getUserIdFromToken(localStorage.getItem('token'));
            const response = await fetch('https://cost-catcher-react.vercel.app/api/updatePassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'), // Get JWT token if needed
                },
                body: JSON.stringify({ accountId: accountId, password: newPassword }),
            });

            if (response.ok) {
                setSuccess("Password updated successfully");
                setError('');
                setNewPassword('');
                setConfirmPassword('');
                toast.success('Password updated successfully', {
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
                    navigate("/signin"); // Navigate to tracking list after a delay
                }, 2000); // 2-second delay before navigating
            } else {
                const result = await response.json();
                setError(result.message || 'Failed to update password');
                setSuccess('');
                toast.error('Failed to update Password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light"
                });
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className='font-inter flex items-center justify-center min-h-screen'>
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
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Set New Password</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-600">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <div className="flex items-center justify-between space-x-4">
                        <button type="submit" className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none">
                            Submit
                        </button>
                        <a href="/account" className="w-full px-4 py-2 text-center text-black border border-black rounded-md hover:bg-blue-50 focus:outline-none">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewPassword;
