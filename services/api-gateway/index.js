const express = require("express");
const axios = require("axios");
const client = require("prom-client");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: "gateway_" });

const requestCounter = new client.Counter({
  name: "gateway_http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"]
});
register.registerMetric(requestCounter);

const requestDuration = new client.Histogram({
  name: "gateway_http_request_duration_seconds",
  help: "Request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5]
});
register.registerMetric(requestDuration);

const services = {
  auth: process.env.AUTH_SERVICE_URL || "http://auth-service:3001",
  products: process.env.PRODUCT_SERVICE_URL || "http://product-service:3002",
  orders: process.env.ORDER_SERVICE_URL || "http://order-service:3003",
  payments: process.env.PAYMENT_SERVICE_URL || "http://payment-service:3004",
  notifications: process.env.NOTIFICATION_SERVICE_URL || "http://notification-service:3005",
  profiles: process.env.USER_PROFILE_SERVICE_URL || "http://user-profile-service:3006"
};

function observe(route, method, status, start) {
  requestCounter.inc({ method, route, status: String(status) });
  requestDuration.observe({ method, route, status: String(status) }, (Date.now() - start) / 1000);
}

async function proxy(req, res, baseUrl, route) {
  const start = Date.now();
  const target = `${baseUrl}${req.path.replace(`/api/${route}`, "")}${req.url.includes("?") ? `?${req.url.split("?")[1]}` : ""}`;
  try {
    const response = await axios({
      method: req.method,
      url: target || baseUrl,
      data: req.body
    });
    observe(`/api/${route}`, req.method, response.status, start);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    observe(`/api/${route}`, req.method, status, start);
    res.status(status).json(error.response?.data || { error: "upstream failure" });
  }
}

app.use("/api/auth", (req, res) => proxy(req, res, services.auth, "auth"));
app.use("/api/products", (req, res) => proxy(req, res, services.products, "products"));
app.use("/api/orders", (req, res) => proxy(req, res, services.orders, "orders"));
app.use("/api/payments", (req, res) => proxy(req, res, services.payments, "payments"));
app.use("/api/notifications", (req, res) => proxy(req, res, services.notifications, "notifications"));
app.use("/api/profiles", (req, res) => proxy(req, res, services.profiles, "profiles"));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "api-gateway" }));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`api-gateway on ${PORT}`));
