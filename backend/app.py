from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os, base64, requests, datetime

load_dotenv()

app = Flask(__name__)

# Get credentials
consumer_key = os.getenv('CONSUMER_KEY')
consumer_secret = os.getenv('CONSUMER_SECRET')
shortcode = os.getenv('BUSINESS_SHORTCODE')
passkey = os.getenv('PASSKEY')
callback_url = os.getenv('CALLBACK_URL')

def get_access_token():
    auth_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    res = requests.get(auth_url, auth=(consumer_key, consumer_secret))
    return res.json().get('access_token')

def generate_password():
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    data = f"{shortcode}{passkey}{timestamp}"
    password = base64.b64encode(data.encode()).decode()
    return password, timestamp

@app.route('/stk-push', methods=['POST'])
def stk_push():
    data = request.get_json()
    phone = data.get('phone')
    amount = data.get('amount')

    token = get_access_token()
    password, timestamp = generate_password()

    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortcode,
        "PhoneNumber": phone,
        "CallBackURL": callback_url,
        "AccountReference": "MpesaReact",
        "TransactionDesc": "Payment via React form"
    }

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    res = requests.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        json=payload,
        headers=headers
    )

    return jsonify(res.json())

if __name__ == '__main__':
    app.run(debug=True)
