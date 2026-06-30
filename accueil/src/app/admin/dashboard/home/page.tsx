import { db } from '@/lib/db';
import HomeEditor from './HomeEditor';

export default async function HomePage() {
  const entry = await db.dataStore.findUnique({ where: { key: 'home' } });
  const data = entry ? JSON.parse(entry.data) : { homeShortcuts: [] };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Accueil — Shortcuts</h1>
      <HomeEditor initialData={data} />
    </div>
  );
}
