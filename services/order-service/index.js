const express = require("express");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3003;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "order_" });

app.post("/", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const result = await pool.query(
    "INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1,$2,$3,'created') RETURNING *",
    [user_id, product_id, quantity]
  );
  res.status(201).json(result.rows[0]);
});

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
  res.json(result.rows);
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "order-service" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`order-service on ${PORT}`));
