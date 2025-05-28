import os
import time
import requests
from pymongo import MongoClient
from emailer import send_email
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# MongoDB connection details from environment variables
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "test")  # Default to 'test' if not set
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "users")  # Default to 'users' if not set

# Amazon API Endpoint
AMAZON_API_ENDPOINT = os.getenv("AMAZON_API_ENDPOINT")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def connect_to_mongo():
    """Connect to MongoDB and return the collection."""
    try:
        client = MongoClient(MONGO_URI)
        logger.info("Connected to MongoDB successfully.")
        db = client[DATABASE_NAME]
        return db[COLLECTION_NAME], client
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        return None, None

def check_hit_price():
    # Connect to MongoDB and fetch the data
    collection, client = connect_to_mongo()
    if not collection:
        return
    
    try:
        documents = collection.find()
        logger.info(f"Checking prices for {collection.count_documents({})} users...")

        for doc in documents:
            user_email = doc.get("email")
            tracklist = doc.get("tracklist", [])
            if not tracklist:
                continue

            for item in tracklist:
                product_url = item.get("productLink")
                current_price = item.get("currentPrice")
                hit_price = item.get("hitPrice")

                if not all([product_url, current_price, hit_price]):
                    logger.warning(f"Skipping incomplete product data for user {user_email}.")
                    continue

                # Call Amazon API to get the current price
                product_id = product_url.split("/")[4]
                try:
                    response = requests.get(AMAZON_API_ENDPOINT + product_id)
                    response.raise_for_status()  # Will raise an HTTPError for bad responses
                    data = response.json()
                    api_current_price = int(data.get("discount_price", 0))

                    logger.info(f"Checking product: {product_url}, Hit Price: ₹{hit_price}, Current Price: ₹{api_current_price}")

                    if api_current_price <= hit_price:
                        logger.info(f"Product {product_url} has hit the target price.")
                        email_content = f"Hi, Product has hit price!\n\n Product URL: {product_url}"
                        send_email(email_content, user_email)
                    else:
                        logger.info(f"Product {product_url} has not hit the target price.")

                except requests.exceptions.RequestException as e:
                    logger.error(f"Error fetching data for {product_url}: {e}")
                    continue

                time.sleep(10)  # Sleep to avoid hitting API too frequently

    except Exception as e:
        logger.error(f"Error fetching data from collection: {e}")

    finally:
        client.close()
        logger.info("Connection to MongoDB closed.")

if __name__ == "__main__":
    while True:
        check_hit_price()
        logger.info("Sleeping for 6 hours before next check...")
        time.sleep(21600)  # Sleep for 6 hours
