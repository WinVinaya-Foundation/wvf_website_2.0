import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';
import { signAuthToken } from '../lib/jwt.js';
import type { LoginInput } from './auth.schemas.js';

function toPublicUser(user: { id: string; name: string; username: string; email: string; role: string }) {
  return { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role };
}

export async function login(input: LoginInput) {
  const identifier = input.identifier.toLowerCase();

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { username: identifier }] },
  });

  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const passwordValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordValid) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const token = signAuthToken({ sub: user.id, role: user.role });

  return { token, user: toPublicUser(user) };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new HttpError(401, 'Invalid or expired session');
  }
  return toPublicUser(user);
}
