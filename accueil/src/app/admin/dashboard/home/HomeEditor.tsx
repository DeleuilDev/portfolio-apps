'use client';

import { useState } from 'react';

interface Shortcut { icon: string; href: string; label: string; }
interface HomeData { homeShortcuts: Shortcut[]; }

export default function HomeEditor({ initialData }: { initialData: HomeData }) {
  const [data, setData] = useState<HomeData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const inputClass = 'px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-foreground';

  function update(index: number, field: string, value: string) {
    setData(d => {
      const homeShortcuts = [...d.homeShortcuts];
      homeShortcuts[index] = { ...homeShortcuts[index], [field]: value };
      return { ...d, homeShortcuts };
    });
  }

  function remove(index: number) {
    setData(d => ({ ...d, homeShortcuts: d.homeShortcuts.filter((_, i) => i !== index) }));
  }

  function add() {
    setData(d => ({ ...d, homeShortcuts: [...d.homeShortcuts, { icon: '', href: '', label: '' }] }));
  }

  async function save() {
    setSaving(true);
    await fetch('/api/admin/data/home', {
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
      <p className="text-sm text-gray-400">Icônes disponibles: cv, github, twitter, linkedin, laptop</p>
      <div className="space-y-2">
        {data.homeShortcuts.map((s, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input placeholder="icône" className={`${inputClass} w-20`} value={s.icon} onChange={e => update(i, 'icon', e.target.value)} />
            <input placeholder="label" className={`${inputClass} w-24`} value={s.label} onChange={e => update(i, 'label', e.target.value)} />
            <input placeholder="href" className={`${inputClass} flex-1`} value={s.href} onChange={e => update(i, 'href', e.target.value)} />
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs px-1">✕</button>
          </div>
        ))}
        <button onClick={add} className="text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded px-3 py-2 w-full">
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
