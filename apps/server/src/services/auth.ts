import type { User } from "@glance/shared";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthenticatedUser {
  username: string;
  passwordHash: string;
}

export async function authenticateUser(
  username: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    // TODO: Load users from config
    const users: Record<string, User> = {
      admin: {
        passwordHash: await bcrypt.hash("admin", 10),
      },
    };

    const user = users[username];
    if (!user?.passwordHash) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    return { username, passwordHash: user.passwordHash };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

export function generateToken(user: AuthenticatedUser): string {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.sign({ username: user.username }, secret, { expiresIn: "24h" });
}

export function verifyToken(token: string): any {
  try {
    const secret = process.env.JWT_SECRET || "your-secret-key";
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
