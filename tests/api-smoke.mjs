import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import bcrypt from "bcryptjs";
import pg from "pg";

const origin = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3010";
const dbUrl = new URL(process.env.DATABASE_URL ?? "");
assert.ok(["127.0.0.1", "localhost"].includes(dbUrl.hostname), "Smoke tests require a local database");
assert.match(dbUrl.pathname, /_test$/, "Smoke tests require a dedicated *_test database");
assert.ok(["127.0.0.1", "localhost"].includes(new URL(origin).hostname), "Smoke tests require a local app");
assert.match(process.env.ADMIN_USER_ID ?? "", /^toolinto_ci_/, "Use a dedicated test administrator");

const password = "local-smoke-password";
const namespace = randomUUID();

async function api(path, { method = "GET", body, cookie } = {}) {
  return fetch(origin + path, {
    method, redirect: "manual",
    headers: { ...(cookie && { cookie }), ...(body !== undefined && { "content-type": "application/json" }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function login(email) {
  const response = await api("/api/auth/login", { method: "POST", body: { email, password } });
  assert.equal(response.status, 200);
  const cookie = response.headers.get("set-cookie");
  assert.match(cookie ?? "", /HttpOnly/i);
  assert.match(cookie ?? "", /SameSite=strict/i);
  return cookie.split(";")[0];
}

test("account authorization, short links and click tracking", async () => {
  const db = new pg.Pool({ connectionString: dbUrl.href });
  const adminId = process.env.ADMIN_USER_ID;
  const adminEmail = `${namespace}-admin@example.com`;
  const email = `${namespace}-user@example.com`;
  const secondEmail = `${namespace}-second@example.com`;
  const codes = [];
  try {
    await db.query('INSERT INTO "User" (id, email, password, name) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password = EXCLUDED.password',
      [adminId, adminEmail, await bcrypt.hash(password, 10), "Smoke admin"]);

    for (const address of [email, secondEmail]) {
      assert.equal((await api("/api/auth/register", { method: "POST", body: { name: "Test", email: address, password } })).status, 201);
    }
    assert.equal((await api("/api/auth/register", { method: "POST", body: { email, password } })).status, 409);
    assert.equal((await api("/api/user/links")).status, 401);
    assert.equal((await api("/api/owner/data")).status, 403);
    assert.equal((await api("/api/shorten", { method: "POST", body: { url: 12 } })).status, 400);
    assert.equal((await api("/api/translate", { method: "POST", body: { text: ["invalid"] } })).status, 400);

    const cookie = await login(email);
    const otherCookie = await login(secondEmail);
    const adminCookie = await login(adminEmail);
    const { user } = await (await api("/api/auth/me", { cookie })).json();
    assert.ok(user.userId);
    assert.equal((await api("/api/owner/data", { cookie })).status, 403);
    assert.equal((await api("/api/owner/toggle-vip", { method: "POST", cookie, body: { userId: user.userId, isVip: true } })).status, 403);

    const adminData = await api("/api/owner/data", { cookie: adminCookie });
    assert.equal(adminData.status, 200);
    const { users } = await adminData.json();
    assert.ok(users.some(row => row.id === user.userId));
    assert.ok(users.every(row => !("password" in row)));
    const changeVip = await api("/api/owner/toggle-vip", { method: "POST", cookie: adminCookie, body: { userId: user.userId, isVip: true } });
    assert.equal(changeVip.status, 200);
    assert.equal((await (await api("/api/auth/me", { cookie })).json()).user.isVip, true);

    for (const session of [undefined, cookie, otherCookie]) {
      const created = await api("/api/shorten", { method: "POST", cookie: session, body: { url: "example.com/toolinto" } });
      assert.equal(created.status, 201);
      const { shortCode } = await created.json();
      assert.match(shortCode, /^[A-Za-z0-9]{7}$/);
      codes.push(shortCode);
    }
    const redirect = await api(`/${codes[1]}`);
    assert.equal(redirect.status, 302);
    assert.equal(redirect.headers.get("location"), "https://example.com/toolinto");
    const { links } = await (await api("/api/user/links", { cookie })).json();
    assert.deepEqual(links.map(row => row.shortCode), [codes[1]]);
    assert.equal(links[0].clicks, 1);
    assert.deepEqual((await (await api("/api/user/links", { cookie: otherCookie })).json()).links.map(row => row.shortCode), [codes[2]]);
    const logout = await api("/api/auth/logout", { method: "POST", cookie });
    assert.match(logout.headers.get("set-cookie") ?? "", /Max-Age=0/i);
  } finally {
    await db.query('DELETE FROM "Link" WHERE "shortCode" = ANY($1::text[])', [codes]);
    await db.query('DELETE FROM "User" WHERE email = ANY($1::text[])', [[adminEmail, email, secondEmail]]);
    await db.end();
  }
});
