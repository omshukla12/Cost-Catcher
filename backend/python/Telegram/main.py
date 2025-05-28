import os
import asyncio
from telethon import TelegramClient, events
from pymongo import MongoClient
import requests
from dotenv import load_dotenv

#  Load environment variables 
load_dotenv()

# === MongoDB Setup ===
mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client[os.getenv("DB_NAME")]
users_collection = db[os.getenv("USERS_COLLECTION")]

#  Bot Credentials 
API_ID = os.getenv("API_ID")
API_HASH = os.getenv("API_HASH")
BOT_TOKEN = os.getenv("BOT_TOKEN")

#  Initialize Bot 
bot = TelegramClient("COST_CATCHER_BOT", API_ID, API_HASH).start(bot_token=BOT_TOKEN)

# Amazon API Endpoint 
amazon_api_endpoint = os.getenv("AMAZON_API_ENDPOINT")

#  Background Price Checker 
async def check_hit_price():
    while True:
        try:
            documents = users_collection.find()
            for doc in documents:
                user_email = doc.get("email")
                telegram_username = doc.get("telegramUsername")
                tracklist = doc.get("tracklist", [])
                
                if not telegram_username or not tracklist:
                    continue

                for item in tracklist:
                    try:
                        product_url = item.get("productLink", "")
                        hit_price_raw = str(item.get("hitPrice", "")).replace("₹", "").replace(",", "").strip()
                        
                        if not hit_price_raw.isdigit():
                            print(f"⚠️ Skipping product for user {telegram_username}: invalid hit price '{hit_price_raw}'")
                            continue
                        
                        hit_price = int(hit_price_raw)

                        # Extract and clean product ID (remove query params if any)
                        parts = product_url.split("/")
                        if len(parts) < 5:
                            print(f"⚠️ Invalid product URL format: {product_url}")
                            continue

                        product_id = parts[4].split("?")[0]  # Strip ?tag=... from product ID

                        # Call affiliate API
                        response = requests.get(amazon_api_endpoint + product_id)
                        if response.status_code != 200:
                            print(f"⚠️ API error for product {product_id}: HTTP {response.status_code}")
                            continue

                        data = response.json()

                        # Validate discount_price in response
                        if "discount_price" not in data or not data["discount_price"]:
                            print(f"⚠️ Missing discount_price for product {product_id}. API response: {data}")
                            continue

                        current_price_raw = str(data.get("discount_price", "0")).replace("₹", "").replace(",", "").strip()
                        if not current_price_raw.isdigit():
                            print(f"⚠️ Skipping product {product_id}: invalid current price '{current_price_raw}'")
                            continue

                        current_price = int(current_price_raw)

                        # Compare current price with user's hit price
                        if current_price <= hit_price:
                            message = (
                                f"🔔 Price Alert!\n"
                                f"Product has hit your target price!\n\n"
                                f"🛒 URL: {product_url}\n"
                                f"💰 Current Price: ₹{current_price}"
                            )
                            await bot.send_message(telegram_username, message)
                        else:
                            print(f"✅ {product_id}: Not yet hit. Current: ₹{current_price}, Target: ₹{hit_price}")

                        await asyncio.sleep(5)  # Small delay between products

                    except Exception as e:
                        print(f"❌ Error processing product for {telegram_username}: {e}")

        except Exception as e:
            print(f"❌ Error in background task: {e}")
        
        print("🕒 Sleeping for 6 hours before next check...")
        await asyncio.sleep(21600)  # Sleep for 6 hours


#  Event Handlers 
@bot.on(events.NewMessage(pattern="/start"))
async def start_handler(event):
    sender = await event.get_sender()
    user = users_collection.find_one({"telegramUsername": sender.username})

    if user:
        await event.respond(f"Hello {sender.first_name}! 👋\nYou're already authorized. Happy tracking!")
    else:
        await event.respond(f"Hello {sender.first_name}! 👋\nPlease authorize your account using /authorize.")

@bot.on(events.NewMessage(pattern="/authorize"))
async def authorize_handler(event):
    await event.respond("Please send your credentials using:\n/signin <email> <password>")

@bot.on(events.NewMessage(pattern="/signin"))
async def signin_handler(event):
    sender = await event.get_sender()
    args = event.raw_text.split()

    if len(args) != 3:
        await event.respond("❌ Usage: /signin <email> <password>")
        return

    email, password = args[1], args[2]

    try:
        response = requests.post(os.getenv("SIGNIN_API_URL"), json={"email": email, "password": password})

        if response.status_code == 200:
            result = response.json()
            if result.get("email") == email:
                # Update MongoDB with telegram username if not already saved
                users_collection.update_one(
                    {"email": email},
                    {"$set": {"telegramUsername": sender.username}},
                    upsert=True
                )
                await event.respond("✅ Authorization successful! You'll now receive alerts when products hit your target price.")
            else:
                await event.respond("❌ Authorization failed. Email mismatch.")
        else:
            await event.respond("❌ Authorization failed. Invalid credentials.")
    except Exception as e:
        print("Authorization error:", e)
        await event.respond("❌ Server error during authorization.")


# === Main ===
def main():
    print("Bot is running...")
    loop = asyncio.get_event_loop()
    loop.create_task(check_hit_price())  # Launch background price checker
    bot.run_until_disconnected()

if __name__ == "__main__":
    main()
