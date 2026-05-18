const express = require("express");
const { Pool } = require("pg");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3006;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "profile_" });

app.get("/:userId", async (req, res) => {
  const result = await pool.query("SELECT * FROM profiles WHERE user_id=$1", [req.params.userId]);
  if (!result.rows.length) return res.status(404).json({ error: "profile not found" });
  res.json(result.rows[0]);
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "user-profile-service" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`user-profile-service on ${PORT}`));
