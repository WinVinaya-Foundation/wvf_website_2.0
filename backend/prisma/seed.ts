import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var ${key} for seeding. Set it in backend/.env.`);
  }
  return value;
}

const owners = [
  {
    name: requireEnv('SEED_OWNER_1_NAME'),
    username: requireEnv('SEED_OWNER_1_USERNAME').toLowerCase(),
    email: requireEnv('SEED_OWNER_1_EMAIL').toLowerCase(),
    password: requireEnv('SEED_OWNER_1_PASSWORD'),
  },
  {
    name: requireEnv('SEED_OWNER_2_NAME'),
    username: requireEnv('SEED_OWNER_2_USERNAME').toLowerCase(),
    email: requireEnv('SEED_OWNER_2_EMAIL').toLowerCase(),
    password: requireEnv('SEED_OWNER_2_PASSWORD'),
  },
];

async function main() {
  for (const owner of owners) {
    const passwordHash = await bcrypt.hash(owner.password, 12);
    await prisma.user.upsert({
      where: { email: owner.email },
      update: { name: owner.name, username: owner.username, role: 'OWNER', passwordHash },
      create: { name: owner.name, username: owner.username, email: owner.email, role: 'OWNER', passwordHash },
    });
    console.log(`Seeded admin user: ${owner.email}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
