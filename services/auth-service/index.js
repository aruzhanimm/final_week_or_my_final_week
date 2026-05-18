const express = require("express");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "auth_" });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT id, username FROM users WHERE username=$1 AND password=$2", [username, password]);
  if (!result.rows.length) return res.status(401).json({ error: "invalid credentials" });
  res.json({ token: `token-${result.rows[0].id}`, user: result.rows[0] });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username", [username, password]);
  res.status(201).json(result.rows[0]);
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "auth-service" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`auth-service on ${PORT}`));
