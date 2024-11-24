import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { jwtDecode } from 'jwt-decode'; // Update import statement
import { ToastContainer, toast } from 'react-toastify';

// Function to get the userId from the JWT
const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.userId;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }
    return null;
};

const EditAccountDetails = () => {
    const [accountDetails, setAccountDetails] = useState(null);
    const [error, setError] = useState(null);
    const [newDetails, setNewDetails] = useState({ name: "", email: "", phone: "" });
    const [detailError, setDetailError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const accountId = getUserIdFromToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!accountId) {
            setError("Unauthorized access. Please login.");
            return;
        }

        const fetchAccountDetails = async () => {
            try {
                const response = await fetch(`https://cost-catcher-react.vercel.app/api/account/${accountId}`);
                const data = await response.json();
                if (response.ok) {
                    setAccountDetails(data.payload);
                    setNewDetails({
                        name: data.payload.name,
                        email: data.payload.email,
                        phone: data.payload.phone
                    });
                } else {
                    setError(data.message || 'Failed to fetch account details');
                }
            } catch (error) {
                setError('Error fetching account details');
            }
        };

        fetchAccountDetails();
    }, [accountId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setDetailError(null);


        try {
            const token = localStorage.getItem("token");
            console.log("Payload being sent:", newDetails);

            const response = await fetch(`https://cost-catcher-react.vercel.app/api/editAccountDetails/${accountId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newDetails)
            });

            const result = await response.json();

            if (response.ok) {
                // alert("Details updated successfully!");

                setAccountDetails(newDetails); // Update local state with new details

                // Navigate to home page
                setTimeout(() => {
                    navigate("/account");
                }, 2000);
            } else {
                setDetailError(result.message || "Updation failed");
                alert("Failed: ", result.message);
            }
        } catch (error) {
            console.error("This error occurred:", error);
            setDetailError("Error updating account details");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!accountId || error) {
        return <div>{error || "Unauthorized access. Please login."}</div>;
    }

    if (!accountDetails) {
        return (
            <div className='flex justify-center items-center'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='font-inter'>
            <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-6">
                <div className='my-4 py-2'>
                    <p className='text-3xl font-semibold'>Update account details</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="flex-1 grid gap-6">
                        <div className="grid gap-1">
                            <label className="text-sm py-2 font-medium" htmlFor="name">Name</label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="name"
                                name='name'
                                value={newDetails.name}
                                onChange={(e) => setNewDetails({ ...newDetails, name: e.target.value })}
                                placeholder={accountDetails.name}
                            />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-sm py-2 font-medium" htmlFor="email">Email</label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="email"
                                name='email'
                                type="email"
                                value={newDetails.email}
                                onChange={(e) => setNewDetails({ ...newDetails, email: e.target.value })}
                                placeholder={accountDetails.email}
                            />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-sm py-2 font-medium" htmlFor="phone">Whatsapp Number</label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                id="phone"
                                name='phone'
                                type="tel"
                                value={newDetails.phone}
                                onChange={(e) => setNewDetails({ ...newDetails, phone: e.target.value })}
                                placeholder={accountDetails.phone || "+91 00000 00000"}
                            />
                        </div>
                        <div className='flex gap-4'>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-1/2 bg-black text-white rounded-md text-sm font-medium h-10 px-4 py-2 hover:bg-gray-800"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Submit"}
                            </button>
                            <a href='/account' className="inline-flex items-center justify-center w-1/2 bg-white text-black border border-black rounded-md text-sm font-medium h-10 px-4 py-2">
                                Cancel
                            </a>
                        </div>
                        {detailError && <p className="text-red-500">{detailError}</p>}
                    </div>
                </form>
                <div className="bg-border h-[1px] w-full my-8"></div>
            </div>
        </div>
    );
};

export default EditAccountDetails;
