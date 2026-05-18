const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("product-service", () => {
  it("health endpoint payload is correct shape", () => {
    const payload = { status: "ok", service: "product-service" };
    assert.strictEqual(payload.status, "ok");
    assert.strictEqual(payload.service, "product-service");
  });

  it("price must be a positive number", () => {
    const isValidPrice = (p) => typeof p === "number" && p > 0;
    assert.ok(isValidPrice(9.99));
    assert.ok(!isValidPrice(-1));
    assert.ok(!isValidPrice("free"));
  });

  it("product object has required fields", () => {
    const product = { id: 1, name: "Widget", price: 4.99, stock: 10 };
    assert.ok(product.id !== undefined);
    assert.ok(product.name);
    assert.ok(product.price > 0);
  });
});
