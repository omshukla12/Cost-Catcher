const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const verifyToken = require("../middleware/verifyToken");
const isValidIndianPhoneNumber = require('../middleware/phone');
const dotenv = require('dotenv');
dotenv.config();

// Secrets from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets must be defined in environment variables.");
}

// Token generators
const generateAccessToken = (user) => jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
const generateRefreshToken = (user) => jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: '7d' });

// Refresh token endpoint
router.post('/refreshToken', (req, res) => {
    const { token: refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

// Utility to handle errors
const handleError = (res, error, message = "Server Error") => {
    console.error(error);
    return res.status(500).json({ message });
};

// Test Route
router.get("/test", (req, res) => {
    res.status(200).json({ message: "Hi, I'm Test endpoint!!!" });
});

// Home Route
router.get('/home', verifyToken, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.email}, welcome to your dashboard!` });
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, phone, telegramUsername, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]{2,20}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,60}$/;

    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
    if (!nameRegex.test(name)) return res.status(400).json({ message: 'Name can only contain letters and spaces (2-20 chars)' });
    if (!isValidIndianPhoneNumber(phone)) return res.status(400).json({ message: "Invalid phone number" });
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters, include upper/lowercase letters, number, and a special character' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or phone already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, phone, telegramUsername, password: hashedPassword });
        await newUser.save();

        const token = generateAccessToken({ userId: newUser._id, email: newUser.email });
        res.status(201).json({ message: 'User signed up successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error during signup' });
    }
});

// Sigin Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = generateAccessToken({ name: user.name, email: user.email, userId: user._id });
        user.activity.push({ activity: "Recent Login", timestamp: new Date() });
        await user.save();

        res.status(200).json({ token, name: user.name, email: user.email });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update Password Route
router.put("/updatePassword", async (req, res) => {
    const { accountId, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(accountId, { password: hashedPassword }, { new: true });

        if (!user) return res.status(404).json({ message: "User not found" });

        user.activity.push({ activity: "Password Updated", timestamp: new Date() });
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Add Product Route
router.post("/addProduct", auth, async (req, res) => {
    const { productURL } = req.body;
    const productId = productURL.split("/")[4];

    try {
        const data = await getAmazonData(productId);
        const { title, discount_price, price, discount } = data;

        res.status(200).json({
            status: "Successful",
            payload: { title, currentPrice: discount_price, originalPrice: price, discount }
        });
    } catch (error) {
        handleError(res, error, "Error fetching product data from Amazon");
    }
});

// Track Product Route
router.post('/trackProduct', auth, async (req, res) => {
    const { productTitle, productLink, currentPrice, hitPrice, category, imageLink } = req.body;

    if (!productLink || !currentPrice || !hitPrice) {
        return res.status(400).json({ message: "Please provide all fields." });
    }

    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the product already exists in the tracklist
        const productExists = user.tracklist.some(item => item.productLink === productLink || item.productTitle === productTitle);
        if (productExists) {
            return res.status(400).json({ message: "Product is already present in your watchlist!" });
        }

        const trackItem = { productTitle, productLink, currentPrice, hitPrice, category, imageLink };
        user.tracklist.push(trackItem);

        // Log the activity
        user.activity.push({ productTitle, productLink, activity: "Added a Product to Tracklist", timestamp: new Date() });
        await user.save();

        res.status(200).json({ message: "Tracklist updated successfully", tracklist: user.tracklist });
    } catch (error) {
        handleError(res, error, "Error updating tracklist");
    }
});

// Get Tracking List Route
router.get("/trackinglist", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ status: "Success", username: user.name, trackinglist: user.tracklist, count: user.tracklist.length });
    } catch (error) {
        handleError(res, error, "Error retrieving tracking list");
    }
});

// Get Product by ID from Tracklist
router.get('/tracklist/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ 'tracklist._id': id });
        if (!user) return res.status(404).json({ message: 'User not found for this product' });

        const product = user.tracklist.find(p => p._id.toString() === id);
        if (!product) return res.status(404).json({ message: 'Product not found in tracklist' });

        const productIdFromLink = product.productLink.split("/")[4].split("?")[0];
        const priceHistory = user.pricehistory?.filter(entry => entry.product_id === productIdFromLink) || [];

        res.json({ ...product.toObject(), priceHistory });
    } catch (error) {
        handleError(res, error, "Error fetching product details from tracklist");
    }
});

// Update Product Tracking Price by ID
router.put('/trackinglist/:productId', async (req, res) => {
    const { productId } = req.params;
    const { newHitPrice } = req.body;

    if (newHitPrice <= 0) return res.status(400).json({ message: "Invalid Price" });

    try {
        const user = await User.findOneAndUpdate(
            { 'tracklist._id': productId },
            { $set: { 'tracklist.$.hitPrice': newHitPrice } },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: 'Product or user not found' });

        user.activity.push({ activity: "Updated Hit Price", timestamp: new Date() });
        await user.save();

        res.json({ message: 'Hit Price updated successfully', user });
    } catch (error) {
        handleError(res, error, "Error updating product");
    }
});

// Delete Product from Tracklist
router.delete('/trackinglist/delete/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { 'tracklist._id': productId },
            { $pull: { tracklist: { _id: productId } } },
            { new: true }
        );

        if (!user) return res.status(400).json({ message: "Product or User not Found" });

        user.activity.push({ activity: "Deleted a Product from Tracklist", timestamp: new Date() });
        await user.save();

        res.status(200).json({ message: "Product Deleted Successfully!", user });
    } catch (error) {
        handleError(res, error, "Error while deleting product");
    }
});

// Edit Account Details
router.put('/editAccountDetails/:accountId', async (req, res) => {
    const { accountId } = req.params;
    const { name, email, phone, telegramUsername } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone && isValidIndianPhoneNumber(phone)) updateFields.phone = phone;
    else if (phone) return res.status(400).json({ message: "Invalid Phone Number" });
    if (email) updateFields.email = email;
    if (telegramUsername) updateFields.telegramUsername = telegramUsername;

    try {
        const user = await User.findByIdAndUpdate(accountId, { $set: updateFields }, { new: true });

        if (!user) return res.status(400).json({ message: "User account not found!" });

        user.activity.push({ activity: "Updated account details", timestamp: new Date() });
        await user.save();

        res.status(200).json({ message: "Details updated successfully!" });
    } catch (error) {
        handleError(res, error, "Error updating account details");
    }
});

// Get Trending Products
router.get('/trendingProducts', async (req, res) => {
    try {
        const result = await TrendingProducts.find({});
        const message = result.length > 0 ? result : "No Trending Products";

        res.status(200).json({ Status: "Successful", payload: message });
    } catch (error) {
        handleError(res, error, "Could not get trending products");
    }
});

// Get Upcoming Sales
router.get('/upcomingSales', async (req, res) => {
    try {
        const result = await SalesData.find({ status: "upcoming" });
        const message = result.length > 0 ? result : "No Upcoming Sales";

        res.status(200).json({ Status: "Successful", payload: message });
    } catch (error) {
        handleError(res, error, "Could not get upcoming sales data");
    }
});

module.exports = router;