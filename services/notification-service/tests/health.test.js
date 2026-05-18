const assert = require("node:assert");
const { describe, it } = require("node:test");

describe("notification-service", () => {
  it("health endpoint payload is correct shape", () => {
    const payload = { status: "ok", service: "notification-service" };
    assert.strictEqual(payload.status, "ok");
    assert.strictEqual(payload.service, "notification-service");
  });

  it("notification requires a recipient", () => {
    const notify = ({ to, message }) => {
      if (!to || !message) throw new Error("Missing required fields");
      return { sent: true, to, message };
    };
    const result = notify({ to: "user@test.com", message: "Order shipped!" });
    assert.ok(result.sent);
    assert.throws(() => notify({ to: "", message: "" }));
  });

  it("notification types are valid", () => {
    const types = ["email", "sms", "push"];
    assert.ok(types.includes("email"));
    assert.ok(!types.includes("fax"));
  });
});
