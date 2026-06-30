import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataDir = join(__dirname, '../src/data');
  const keys = ['personal', 'experience', 'projects', 'skills', 'home', 'cv'];

  for (const key of keys) {
    const filePath = join(dataDir, `${key}.json`);
    const data = readFileSync(filePath, 'utf-8');
    await prisma.dataStore.upsert({
      where: { key },
      update: { data },
      create: { key, data },
    });
    console.log(`Seeded: ${key}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
