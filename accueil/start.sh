#!/bin/sh
set -e

echo "[start] Ensuring DB schema..."
node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
async function main() {
  await p.\$executeRawUnsafe(\`
    CREATE TABLE IF NOT EXISTS \"DataStore\" (
      \"key\" TEXT NOT NULL PRIMARY KEY,
      \"data\" TEXT NOT NULL,
      \"updatedAt\" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  \`);
  console.log('[db] Schema ready');
  await p.\$disconnect();
}
main().catch(e => { console.error('[db error]', e.message); process.exit(1); });
"

echo "[start] Seeding if empty..."
node -e "
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const p = new PrismaClient();
async function seed() {
  const count = await p.dataStore.count().catch(() => 0);
  if (count === 0) {
    const dir = path.join('/app', 'data');
    const keys = ['personal', 'experience', 'projects', 'skills', 'home', 'cv'];
    for (const key of keys) {
      const file = path.join(dir, key + '.json');
      if (fs.existsSync(file)) {
        const data = fs.readFileSync(file, 'utf-8');
        await p.dataStore.create({ data: { key, data } });
        console.log('[seed] ' + key);
      }
    }
  }
  await p.\$disconnect();
}
seed().catch(e => { console.error('[seed error]', e.message); process.exit(0); });
"

node server.js
