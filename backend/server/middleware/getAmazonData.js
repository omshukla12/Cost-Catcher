const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const AMAZON_API_URL = process.env.AMAZON_API_URL;

if (!AMAZON_API_URL) {
    throw new Error("Missing environment variables for Amazon API.");
}

async function getAmazonData(productId) {
    try {
        const url = `${AMAZON_API_URL}?` + new URLSearchParams({ id: productId }).toString();
        const resp = await fetch(url);

        if (resp.status !== 200) {
            console.warn(`Amazon API responded with status: ${resp.status}`);
            return null;
        }

        const data = await resp.json();

        const requiredFields = [
            "product_id", "title", "price", "discount_price",
            "link", "image_link", "product_category", "store", "discount"
        ];

        const isValid = requiredFields.every(field => data[field]);

        if (isValid) {
            return data;
        } else {
            console.warn("Amazon API response missing required fields.");
        }
    } catch (error) {
        console.error("Error in getAmazonData:", error);
    }

    return null;
}

module.exports = getAmazonData;
