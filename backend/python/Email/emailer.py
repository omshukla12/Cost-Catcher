import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Email sender details from environment variables
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

# Set up logging
logging.basicConfig(level=logging.INFO)

def send_email(email_receiver, name, product_name, price):
    subject = "Product has hit Target Price"
    content = (
        f"Hello {name},\n\n"
        f"A product from your trackinglist has hit target price.\n\n"
        f"Product Name: {product_name}\n\n"
        f"Price: ₹{price}\n\n"
        "Visit our website to purchase it now!\n\n"
        "Best regards,\n"
        "Cost Catcher Team"
    )

    send_email_helper(email_receiver, subject, content)

def send_otp(email_receiver, otp):
    subject = "OTP for signing up"
    content = f"Your OTP for signing up to Cost Catcher is: {otp}"

    send_email_helper(email_receiver, subject, content)

def send_email_helper(email_receiver, subject, content):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_SENDER
    msg['To'] = email_receiver
    msg.set_content(content)

    try:
        # Using a secure connection to Gmail's SMTP server
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
            smtp.send_message(msg)
            logging.info(f"Email sent successfully to {email_receiver}")
    except Exception as e:
        logging.error(f"Failed to send email to {email_receiver}: {e}")

# Example usage
if __name__ == "__main__":
    # Receiver email and dynamic data
    email_receiver = "anuragd275@gmail.com"
    name = "Anurag Dubey"
    product_name = "RR Signature Zello 5L Water Heater for Home"
    price = "1999"

    # Send the email
    send_email(email_receiver, name, product_name, price)
