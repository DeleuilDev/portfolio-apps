export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import ExperienceEditor from './ExperienceEditor';

export default async function ExperiencePage() {
  const entry = await db.dataStore.findUnique({ where: { key: 'experience' } });
  const data = entry ? JSON.parse(entry.data) : { experience: [], education: [] };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Expériences</h1>
      <ExperienceEditor initialData={data} />
    </div>
  );
}
