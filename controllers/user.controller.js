const db = require("../database/database");

const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "login failed" });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      const user = results[0];
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "24h",
      });

      res.json({
        message: "Login successful",
        token,
        id: results[0].id,
        email: results[0].email,
        name: results[0].name,
      });
    }
  );
};

module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  console.log("req.body", req.body);
  
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to perform signup" });
      return;
    }

    if (results.length > 0) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to perform signup" });
          return;
        }
        res.json({ message: "Signup successful" });
      }
    );
  });
};

