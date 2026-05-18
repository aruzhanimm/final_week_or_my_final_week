const express = require("express");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3002;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "product_" });

app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT id, name, price FROM products ORDER BY id");
  res.json(result.rows);
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "product-service" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`product-service on ${PORT}`));
