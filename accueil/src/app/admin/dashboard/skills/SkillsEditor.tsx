'use client';

import { useState } from 'react';

interface Skill { name: string; icon: string; }
interface SkillsData { skills: Skill[]; }

export default function SkillsEditor({ initialData }: { initialData: SkillsData }) {
  const [data, setData] = useState<SkillsData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const inputClass = 'px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-foreground';

  function update(index: number, field: string, value: string) {
    setData(d => {
      const skills = [...d.skills];
      skills[index] = { ...skills[index], [field]: value };
      return { ...d, skills };
    });
  }

  function remove(index: number) {
    setData(d => ({ ...d, skills: d.skills.filter((_, i) => i !== index) }));
  }

  function add() {
    setData(d => ({ ...d, skills: [...d.skills, { name: '', icon: '' }] }));
  }

  async function save() {
    setSaving(true);
    await fetch('/api/admin/data/skills', {
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
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded px-2 py-1">
            <input
              placeholder="nom"
              className={`${inputClass} w-24`}
              value={skill.name}
              onChange={e => update(i, 'name', e.target.value)}
            />
            <input
              placeholder="icône"
              className={`${inputClass} w-20`}
              value={skill.icon}
              onChange={e => update(i, 'icon', e.target.value)}
            />
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs ml-1">✕</button>
          </div>
        ))}
        <button
          onClick={add}
          className="border border-dashed border-gray-300 rounded px-3 py-1 text-sm text-gray-500 hover:text-foreground"
        >
          + Ajouter
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
