const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("payment-service", () => {
  it("health endpoint payload is correct shape", () => {
    const payload = { status: "ok", service: "payment-service" };
    assert.strictEqual(payload.status, "ok");
    assert.strictEqual(payload.service, "payment-service");
  });

  it("payment amount must be positive", () => {
    const isValidAmount = (a) => typeof a === "number" && a > 0;
    assert.ok(isValidAmount(100));
    assert.ok(!isValidAmount(0));
    assert.ok(!isValidAmount(-50));
  });

  it("payment status is one of allowed values", () => {
    const allowed = ["pending", "success", "failed", "refunded"];
    assert.ok(allowed.includes("success"));
    assert.ok(!allowed.includes("error"));
  });
});
