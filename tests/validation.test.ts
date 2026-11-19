import assert from "node:assert/strict";
import test from "node:test";
import { generateShortCode } from "../lib/shortcode";
import { normalizeUrl, translationInput, validEmail, validPassword } from "../lib/validation";

test("the shortener normalizes HTTP destinations and rejects invalid inputs", () => {
  assert.equal(normalizeUrl("  example.com/مسیر  "), "https://example.com/%D9%85%D8%B3%DB%8C%D8%B1");
  assert.equal(normalizeUrl("http://example.com:8080/a?q=1"), "http://example.com:8080/a?q=1");
  for (const input of [null, 1, {}, "", "ftp://example.com", "https://user@example.com", "https://localhost", "https://example.com/" + "a".repeat(2048)]) {
    assert.equal(normalizeUrl(input), null);
  }
});

test("credentials are validated without truncating multi-byte passwords", () => {
  assert.ok(validEmail("owner@example.com"));
  assert.equal(validEmail(["owner@example.com"]), false);
  assert.equal(validPassword("short", 8), false);
  assert.equal(validPassword("آ".repeat(36), 8), true);
  assert.equal(validPassword("آ".repeat(37), 8), false);
});

test("translation passes only supported language pairs and bounded text", () => {
  assert.deepEqual(translationInput({ text: "سلام", from: "fa", to: "en" }), { text: "سلام", from: "fa", to: "en" });
  assert.equal(translationInput({ text: "hello", from: "en", to: "invalid" }), null);
  assert.equal(translationInput({ text: [], from: "fa", to: "en" }), null);
  assert.equal(translationInput({ text: "a".repeat(1001), from: "fa", to: "en" }), null);
});

test("generated link codes fit the redirect route", () => {
  for (let i = 0; i < 100; i++) assert.match(generateShortCode(), /^[A-Za-z0-9]{7}$/);
});
