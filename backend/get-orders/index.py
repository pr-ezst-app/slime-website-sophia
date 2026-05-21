"""Get all pending orders — admin only."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    req_password = (event.get("headers") or {}).get("X-Admin-Password", "")
    if req_password != os.environ.get("ADMIN_PASSWORD", ""):
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Unauthorized"})}

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        f"""SELECT id, order_number, customer_first_name, customer_last_name,
                   customer_email, address, city, state, zip, items, total, created_at
            FROM {schema}.orders
            WHERE status = 'pending'
            ORDER BY created_at ASC"""
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    orders = []
    for r in rows:
        orders.append({
            "id": r[0],
            "orderNumber": r[1],
            "firstName": r[2],
            "lastName": r[3],
            "email": r[4],
            "address": r[5],
            "city": r[6],
            "state": r[7],
            "zip": r[8],
            "items": r[9],
            "total": float(r[10]),
            "createdAt": r[11].isoformat(),
        })

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"orders": orders}),
    }