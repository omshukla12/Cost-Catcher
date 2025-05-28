const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Load Mongo DB Connection string
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB'))


// Sales Data Schema
const salesDataSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    duration: { type: String },
    store: { type: String },
    description: { type: String },
    status: { type: String }
})

// Track Item Schema
const trackItemSchema = new mongoose.Schema({
    productTitle: String,
    productLink: String,
    currentPrice: Number,
    hitPrice: Number,
    category: String,
    imageLink: String
});

// Activity Schema
const activitySchema = new mongoose.Schema({
    productTitle: String,
    productLink: String,
    activity: String,
    timestamp: Date,
});

// Price History Schema
const pricehistorySchema = new mongoose.Schema({
    product_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    deal_price: { type: String, required: true },
    original_price: { type: String, required: true },
    discount: { type: String, required: true },
    time: { type: Date, default: Date.now }
})

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    telegramUsername: { type: String },
    tracklist: [trackItemSchema], // Default empty array
    activity: [activitySchema], // Default empty array
    pricehistory: [pricehistorySchema] // Default empty array
});

// Trending Products Schema
const trendingProductsSchema = new mongoose.Schema({
    product_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    deal_price: { type: String },
    original_price: { type: String },
    discount: { type: String },
    image_url: { type: String },
    product_url: { type: String },
    is_trending: { type: Boolean },
    category: { type: String },
    date: { type: String },
}, { collection: 'products' })

const User = mongoose.model('User', userSchema);
const TrendingProducts = mongoose.model('TrendingProducts', trendingProductsSchema);
const SalesData = mongoose.model('Sale', salesDataSchema);

module.exports = { User, TrendingProducts, SalesData };