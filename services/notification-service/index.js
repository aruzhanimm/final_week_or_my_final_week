const express = require("express");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3005;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "notification_" });

app.post("/", async (req, res) => {
  const { user_id, message } = req.body;
  const result = await pool.query(
    "INSERT INTO notifications (user_id, message, status) VALUES ($1,$2,'sent') RETURNING *",
    [user_id, message]
  );
  res.status(201).json(result.rows[0]);
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "notification-service" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`notification-service on ${PORT}`));
