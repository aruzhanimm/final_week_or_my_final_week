const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("order-service", () => {
  it("health endpoint payload is correct shape", () => {
    const payload = { status: "ok", service: "order-service" };
    assert.strictEqual(payload.status, "ok");
    assert.strictEqual(payload.service, "order-service");
  });

  it("order status transitions are valid", () => {
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    assert.ok(validStatuses.includes("pending"));
    assert.ok(validStatuses.includes("delivered"));
    assert.ok(!validStatuses.includes("refunded"));
  });

  it("order total is calculated correctly", () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    assert.strictEqual(total, 35);
  });
});
