import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./prisma";

export const SESSION_COOKIE = "auth_token";
export const SESSION_AGE = 60 * 60 * 24 * 7;
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
} as const;

function sessionKey() {
  const key = new TextEncoder().encode(process.env.JWT_SECRET ?? "");
  if (key.length < 32) throw new Error("JWT_SECRET must be at least 32 bytes");
  return key;
}

export async function createSession(userId: string) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer("toolinto")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_AGE}s`)
    .sign(sessionKey());
}

export async function getSessionUserId() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const key = sessionKey();
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"], issuer: "toolinto", requiredClaims: ["sub", "exp"],
    });
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

export async function getAdminId() {
  const adminId = process.env.ADMIN_USER_ID;
  if (!adminId || (await getSessionUserId()) !== adminId) return null;
  return (await prisma.user.findUnique({ where: { id: adminId }, select: { id: true } }))?.id ?? null;
}
