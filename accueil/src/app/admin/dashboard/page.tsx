export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { db } from '@/lib/db';

export default async function Dashboard() {
  const entries = await db.dataStore.findMany();
  const updatedAt = entries.reduce<Record<string, string>>((acc, e) => {
    acc[e.key] = e.updatedAt.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return acc;
  }, {});

  const sections = [
    { key: 'personal', href: '/admin/dashboard/personal', label: 'Profil' },
    { key: 'experience', href: '/admin/dashboard/experience', label: 'Expériences' },
    { key: 'projects', href: '/admin/dashboard/projects', label: 'Projets' },
    { key: 'skills', href: '/admin/dashboard/skills', label: 'Compétences' },
    { key: 'home', href: '/admin/dashboard/home', label: 'Accueil (shortcuts)' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        {sections.map(({ key, href, label }) => (
          <Link
            key={key}
            href={href}
            className="border border-gray-200 dark:border-gray-700 rounded p-4 hover:border-foreground transition-colors group"
          >
            <h2 className="font-semibold mb-1 group-hover:text-foreground">{label}</h2>
            <p className="text-xs text-gray-400">
              {updatedAt[key] ? `Mis à jour le ${updatedAt[key]}` : 'Non initialisé'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
