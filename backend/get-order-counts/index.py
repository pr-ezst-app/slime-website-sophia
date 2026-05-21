"""Get pending order counts per slime product name — shown as badges in the shop."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        f"""SELECT item->>'name' as slime_name, SUM((item->>'qty')::int) as total_qty
            FROM {schema}.orders, jsonb_array_elements(items) as item
            WHERE status = 'pending'
            GROUP BY item->>'name'"""
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    counts = {r[0]: int(r[1]) for r in rows}

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"counts": counts}),
    }
