import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
        phone: ""
    });

    const navigate = useNavigate();

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        const url = "https://cost-catcher-react.vercel.app/api/signup";

        try {
            const data = await fetch(url, {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify(formData),
            });

            const response = await data.json();
            console.log(response);

            if (response.token) {
                // Store the token in local storage
                localStorage.setItem("token", response.token);
                
                alert("Success");

                // Navigate to home page
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } else {
                // Handle the error if token is not present (signup failed)
                console.error("Signup failed:", response.message);
                
                alert("fail: ", response.message);
                // Display error message to the user (you can use a toast or similar UI feedback)
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300 font-inter">
            
            <div className="w-full max-w-md space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-4">
                            <div className="grid gap-2">
                                <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    required
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    required
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="email"
                                >
                                    Whatsapp Number
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    required
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 00000 00000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    required
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center p-6">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-black text-white hover:bg-black/90 h-10 px-4 py-2 w-full"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className='text-center py-4'>
                        <p className='text-sm'>Already have an account? <a href='/signin' className='underline'>Signin</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;