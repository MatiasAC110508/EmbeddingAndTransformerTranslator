import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-jwt-secret-change-me";
const JWT_EXPIRATION = "7d";
const JWT_MAX_AGE_IN_SECONDS = 60 * 60 * 24 * 7;

const secret = new TextEncoder().encode(JWT_SECRET);

type AuthCookieOptions = {
  httpOnly: boolean;
  maxAge: number;
  path: string;
  sameSite: "lax";
  secure: boolean;
};

export type AuthTokenPayload = {
  userId: string;
  email: string;
};

export const authCookieName = "auth_token";

// Shared cookie options keep login and logout handlers aligned with the same security policy.
export const authCookieOptions: AuthCookieOptions = {
  httpOnly: true,
  maxAge: JWT_MAX_AGE_IN_SECONDS,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

// JWT signing happens on the server so the browser only receives the resulting cookie.
export async function signAuthToken(payload: AuthTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(secret);
}

// Verification is reused by the proxy and the server components that protect private routes.
export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  return payload as AuthTokenPayload & {
    exp?: number;
    iat?: number;
  };
}
