import { db } from '@/lib/db';
import ProjectsEditor from './ProjectsEditor';

export default async function ProjectsPage() {
  const entry = await db.dataStore.findUnique({ where: { key: 'projects' } });
  const data = entry ? JSON.parse(entry.data) : { projects: [] };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Projets</h1>
      <ProjectsEditor initialData={data} />
    </div>
  );
}
