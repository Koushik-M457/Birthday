from flask import Flask, render_template
import json, os, qrcode
import time
START_TIME_FILE = "start_time.json"
DURATION = 3600


MAX_SCANS = 2
DATA_FILE = "data.json"

app = Flask(__name__)

def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f)
def get_remaining():
    if not os.path.exists(START_TIME_FILE):
        with open(START_TIME_FILE, "w") as f:
            json.dump({"start": time.time()}, f)

    try:
        with open(START_TIME_FILE) as f:
            data = json.load(f)
            start = data.get("start")
            
        if start is None:
            raise ValueError("Start time not set")
            
    except (FileNotFoundError, json.JSONDecodeError, ValueError):
        start = time.time()
        with open(START_TIME_FILE, "w") as f:
            json.dump({"start": start}, f)

    return max(0, int(DURATION - (time.time() - start)))


@app.route("/")
def home():
    data = read_data()
    if data["scan_count"] >= MAX_SCANS:
        return render_template("expired.html")

    data["scan_count"] += 1
    write_data(data)

    remaining = get_remaining()
    return render_template("index.html", remaining=remaining)
@app.route("/admin")
def admin():
    return """
    <h2>Admin Panel</h2>
    <button onclick="fetch('/admin/reset').then(()=>alert('Reset Done'))">
      🔄 Restart Experience
    </button>
    """


@app.route("/admin/reset")
def reset():
    write_data({"scan_count": 0})
    with open(START_TIME_FILE, "w") as f:
        json.dump({"start": time.time()}, f)
    return "✅ QR reset successful"

# Generate QR once
if not os.path.exists("static/qr.png"):
    qr = qrcode.make("http://127.0.0.1:5000/")
    qr.save("static/qr.png")

if __name__ == "__main__":
    app.run()
