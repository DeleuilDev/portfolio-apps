'use client';

import { useState } from 'react';

interface Project { title: string; description: string; tags: string[]; githubUrl: string; }
interface ProjectsData { projects: Project[]; }

const emptyProject = (): Project => ({ title: '', description: '', tags: [], githubUrl: '' });

export default function ProjectsEditor({ initialData }: { initialData: ProjectsData }) {
  const [data, setData] = useState<ProjectsData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const inputClass = 'w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-foreground';

  function update(index: number, field: string, value: string | string[]) {
    setData(d => {
      const projects = [...d.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...d, projects };
    });
  }

  function remove(index: number) {
    setData(d => ({ ...d, projects: d.projects.filter((_, i) => i !== index) }));
    if (editingIndex === index) setEditingIndex(null);
  }

  function add() {
    setData(d => ({ ...d, projects: [...d.projects, emptyProject()] }));
    setEditingIndex(data.projects.length);
  }

  async function save() {
    setSaving(true);
    await fetch('/api/admin/data/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-2">
        {data.projects.map((project, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded">
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setEditingIndex(editingIndex === i ? null : i)}
            >
              <span className="text-sm font-medium">{project.title || 'Sans titre'}</span>
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(i); }} className="text-red-400 hover:text-red-600 text-xs px-1">✕</button>
                <span className="text-gray-400 text-xs">{editingIndex === i ? '▲' : '▼'}</span>
              </div>
            </div>
            {editingIndex === i && (
              <div className="px-3 pb-3 pt-1 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <input placeholder="Titre" className={inputClass} value={project.title} onChange={e => update(i, 'title', e.target.value)} />
                <textarea placeholder="Description" className={`${inputClass} h-20 resize-none`} value={project.description} onChange={e => update(i, 'description', e.target.value)} />
                <input
                  placeholder="Tags (séparés par des virgules)"
                  className={inputClass}
                  value={project.tags.join(', ')}
                  onChange={e => update(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                />
                <input placeholder="URL GitHub / Lien" className={inputClass} value={project.githubUrl} onChange={e => update(i, 'githubUrl', e.target.value)} />
              </div>
            )}
          </div>
        ))}
        <button onClick={add} className="text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded px-3 py-2 w-full">
          + Ajouter un projet
        </button>
      </div>
      <button
        onClick={save}
        disabled={saving}
        className="px-6 py-2 bg-foreground text-background rounded hover:opacity-80 transition-opacity disabled:opacity-50 text-sm"
      >
        {saving ? 'Sauvegarde...' : saved ? 'Sauvegardé ✓' : 'Sauvegarder'}
      </button>
    </div>
  );
}
