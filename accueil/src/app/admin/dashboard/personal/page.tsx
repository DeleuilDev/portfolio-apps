export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import PersonalEditor from './PersonalEditor';

export default async function PersonalPage() {
  const entry = await db.dataStore.findUnique({ where: { key: 'personal' } });
  const data = entry ? JSON.parse(entry.data) : {};
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Profil</h1>
      <PersonalEditor initialData={data} />
    </div>
  );
}
