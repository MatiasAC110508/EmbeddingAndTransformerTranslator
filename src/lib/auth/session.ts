import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieName, verifyAuthToken } from "./jwt";

// getSession is the lightweight entry point for any server-side auth check.
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

// requireSession is used by private pages that should redirect anonymous users immediately.
export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}
