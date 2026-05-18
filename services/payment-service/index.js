const express = require("express");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3004;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "payment_" });

app.post("/", async (req, res) => {
  const { order_id, amount } = req.body;
  const result = await pool.query(
    "INSERT INTO payments (order_id, amount, status) VALUES ($1,$2,'paid') RETURNING *",
    [order_id, amount]
  );
  await pool.query("UPDATE orders SET status='paid' WHERE id=$1", [order_id]);
  res.status(201).json(result.rows[0]);
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "payment-service" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`payment-service on ${PORT}`));
