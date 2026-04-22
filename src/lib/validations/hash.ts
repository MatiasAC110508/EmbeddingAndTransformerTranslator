import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Password hashing is kept in a helper so route handlers stay focused on HTTP concerns.
export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Password comparison is separated for reuse in the login flow.
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword);
}
