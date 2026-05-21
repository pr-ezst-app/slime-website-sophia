"""Place a new slime order — saves to DB and sends email to customer."""
import json
import os
import psycopg2
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    order_number = body.get("orderNumber")
    first = body.get("firstName")
    last = body.get("lastName")
    email = body.get("email")
    address = body.get("address")
    city = body.get("city")
    state = body.get("state")
    zip_code = body.get("zip")
    items = body.get("items", [])
    subtotal = float(body.get("subtotal", 0))
    shipping = 10.00
    total = subtotal + shipping

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        f"""INSERT INTO {schema}.orders
            (order_number, customer_first_name, customer_last_name, customer_email,
             address, city, state, zip, items, subtotal, shipping, total, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'pending')""",
        (order_number, first, last, email, address, city, state, zip_code,
         json.dumps(items), subtotal, shipping, total)
    )
    conn.commit()
    cur.close()
    conn.close()

    # Send confirmation email via SendGrid
    sendgrid_key = os.environ.get("SENDGRID_API_KEY", "")
    if sendgrid_key:
        items_html = "".join(
            f"<tr><td style='padding:4px 8px'>{i.get('emoji','')} {i.get('name','')}</td>"
            f"<td style='padding:4px 8px'>×{i.get('qty',1)}</td>"
            f"<td style='padding:4px 8px'>${float(i.get('price',0))*int(i.get('qty',1)):.2f}</td></tr>"
            for i in items
        )
        email_body = {
            "personalizations": [{"to": [{"email": email}]}],
            "from": {"email": "squishalishslime@gmail.com", "name": "Squishalish Slimes"},
            "subject": f"Your order {order_number} is being made! 🫧",
            "content": [{
                "type": "text/html",
                "value": f"""
                <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px">
                  <h2 style="color:#f472b6">Your slime is being made! 🫧</h2>
                  <p>Hi {first}! Sophia got your order <strong>{order_number}</strong> and is making it right now with lots of love 💕</p>
                  <table style="width:100%;border-collapse:collapse;margin:16px 0">
                    <thead><tr style="background:#fce7f3">
                      <th style="padding:4px 8px;text-align:left">Item</th>
                      <th style="padding:4px 8px">Qty</th>
                      <th style="padding:4px 8px">Price</th>
                    </tr></thead>
                    <tbody>{items_html}</tbody>
                  </table>
                  <p><strong>Shipping to:</strong><br>{address}, {city}, {state} {zip_code}</p>
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
        "body": json.dumps({"success": True, "orderNumber": order_number}),
    }