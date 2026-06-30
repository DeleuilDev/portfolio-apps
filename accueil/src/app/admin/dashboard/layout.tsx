'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const sections = [
  { href: '/admin/dashboard', label: "Vue d'ensemble", exact: true },
  { href: '/admin/dashboard/personal', label: 'Profil' },
  { href: '/admin/dashboard/experience', label: 'Expériences' },
  { href: '/admin/dashboard/projects', label: 'Projets' },
  { href: '/admin/dashboard/skills', label: 'Compétences' },
  { href: '/admin/dashboard/home', label: 'Accueil' },
  { href: '/admin/dashboard/cv-generator', label: 'Générateur CV', divider: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  return (
    <div className="min-h-screen flex font-mono bg-background text-foreground">
      <aside className="w-48 border-r border-gray-200 dark:border-gray-700 flex flex-col py-8 px-4 shrink-0">
        <Link href="/" className="text-sm text-gray-500 hover:text-foreground mb-8 block">← Site</Link>
        <nav className="flex-1 space-y-1">
          {sections.map(({ href, label, exact, divider }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <div key={href}>
                {divider && <div className="border-t border-gray-200 dark:border-gray-700 my-2" />}
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded text-sm transition-colors ${
                    active
                      ? 'bg-foreground text-background'
                      : 'text-gray-600 dark:text-gray-400 hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              </div>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-foreground text-left px-3 py-2"
        >
          Déconnexion
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
