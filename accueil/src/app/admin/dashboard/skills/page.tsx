import { db } from '@/lib/db';
import SkillsEditor from './SkillsEditor';

export default async function SkillsPage() {
  const entry = await db.dataStore.findUnique({ where: { key: 'skills' } });
  const data = entry ? JSON.parse(entry.data) : { skills: [] };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Compétences</h1>
      <SkillsEditor initialData={data} />
    </div>
  );
}
