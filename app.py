from flask import Flask, render_template, request
import sqlite3
import os

app = Flask(__name__)

DATABASE = "users.db"

# -----------------------
# Database Setup
# -----------------------
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    """)
    cursor.execute("DELETE FROM users")
    cursor.execute("INSERT INTO users (username, password) VALUES ('admin', 'admin123')")
    conn.commit()
    conn.close()

if not os.path.exists(DATABASE):
    init_db()

# -----------------------
# Routes
# -----------------------
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/xss")
def xss():
    return render_template("xss.html")

@app.route("/password")
def password():
    return render_template("password.html")

@app.route("/encryption")
def encryption():
    return render_template("encryption.html")

# -----------------------
# SQL Injection Demo
# -----------------------
@app.route("/sqli", methods=["GET", "POST"])
def sqli():
    message = ""
    secure_message = ""

    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # 🚨 Vulnerable Query
        query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
        result = cursor.execute(query).fetchone()

        if result:
            message = "Vulnerable Login: SUCCESS"
        else:
            message = "Vulnerable Login: FAILED"

        # ✅ Secure Query
        cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
        secure_result = cursor.fetchone()

        if secure_result:
            secure_message = "Secure Login: SUCCESS"
        else:
            secure_message = "Secure Login: FAILED"

        conn.close()

    return render_template("sqli.html", message=message, secure_message=secure_message)

if __name__ == "__main__":
    app.run(debug=True)