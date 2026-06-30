#!/bin/sh
set -e

echo "[start] Running prisma db push..."
node_modules/.bin/prisma db push --skip-generate
echo "[start] DB schema ready"

# Auto-seed si la DB est vide (premier déploiement)
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
" 2>&1

node server.js
