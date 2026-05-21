"""Mark an order as complete and email the customer that it's on its way."""
import json
import os
import psycopg2
import urllib.request
import urllib.error
from datetime import datetime, timezone


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    req_password = (event.get("headers") or {}).get("X-Admin-Password", "")
    if req_password != os.environ.get("ADMIN_PASSWORD", ""):
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Unauthorized"})}

    body = json.loads(event.get("body") or "{}")
    order_id = body.get("orderId")

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        f"""UPDATE {schema}.orders SET status='complete', completed_at=%s
            WHERE id=%s
            RETURNING order_number, customer_first_name, customer_email, address, city, state, zip""",
        (datetime.now(timezone.utc), order_id)
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if not row:
        return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Order not found"})}

    order_number, first, email, address, city, state, zip_code = row

    # Send "being made" email
    sendgrid_key = os.environ.get("SENDGRID_API_KEY", "")
    if sendgrid_key:
        email_body = {
            "personalizations": [{"to": [{"email": email}]}],
            "from": {"email": "squishalishslime@gmail.com", "name": "Squishalish Slimes"},
            "subject": f"Your slime {order_number} is being made! 🫧",
            "content": [{
                "type": "text/html",
                "value": f"""
                <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px">
                  <h2 style="color:#f472b6">Great news, {first}! 🎉</h2>
                  <p>Sophia is making your slime <strong>{order_number}</strong> right now with lots of love and care! 💕</p>
                  <p>It will be on its way to you at:<br>
                  <strong>{address}, {city}, {state} {zip_code}</strong></p>
                  <p style="color:#6b7280;font-size:13px">Questions? Email squishalishslime@gmail.com ✨</p>
                </div>"""
            }]
        }
        req = urllib.request.Request(
            "https://api.sendgrid.com/v3/mail/send",
            data=json.dumps(email_body).encode(),
            headers={"Authorization": f"Bearer {sendgrid_key}", "Content-Type": "application/json"},
            method="POST"
        )
        try:
            urllib.request.urlopen(req)
        except urllib.error.HTTPError:
            pass

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"success": True}),
    }
