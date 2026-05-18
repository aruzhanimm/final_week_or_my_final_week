const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("user-profile-service", () => {
  it("health endpoint payload is correct shape", () => {
    const payload = { status: "ok", service: "user-profile-service" };
    assert.strictEqual(payload.status, "ok");
    assert.strictEqual(payload.service, "user-profile-service");
  });

  it("email format is validated", () => {
    const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    assert.ok(isEmail("user@example.com"));
    assert.ok(!isEmail("not-an-email"));
  });

  it("username length is enforced", () => {
    const isValidUsername = (u) => u && u.length >= 3 && u.length <= 20;
    assert.ok(isValidUsername("alice"));
    assert.ok(!isValidUsername("ab"));
    assert.ok(!isValidUsername("a".repeat(21)));
  });
});
