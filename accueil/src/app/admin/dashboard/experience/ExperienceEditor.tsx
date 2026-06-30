'use client';

import { useState } from 'react';

interface Item { title: string; company: string; period: string; description: string; }
interface ExperienceData { experience: Item[]; education: Item[]; }

const emptyItem = (): Item => ({ title: '', company: '', period: '', description: '' });

function ItemList({ items, onChange }: { items: Item[]; onChange: (items: Item[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const inputClass = 'w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-foreground';

  function update(index: number, field: string, value: string) {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  }

  function add() {
    onChange([...items, emptyItem()]);
    setEditingIndex(items.length);
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded">
          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setEditingIndex(editingIndex === i ? null : i)}
          >
            <div>
              <span className="text-sm font-medium">{item.title || 'Sans titre'}</span>
              {item.company && <span className="text-xs text-gray-400 ml-2">{item.company}</span>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                className="text-red-400 hover:text-red-600 text-xs px-1"
              >✕</button>
              <span className="text-gray-400 text-xs">{editingIndex === i ? '▲' : '▼'}</span>
            </div>
          </div>
          {editingIndex === i && (
            <div className="px-3 pb-3 pt-1 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <input placeholder="Titre" className={inputClass} value={item.title} onChange={e => update(i, 'title', e.target.value)} />
              <input placeholder="Entreprise / École" className={inputClass} value={item.company} onChange={e => update(i, 'company', e.target.value)} />
              <input placeholder="Période (ex: 2022 - Now)" className={inputClass} value={item.period} onChange={e => update(i, 'period', e.target.value)} />
              <textarea placeholder="Description" className={`${inputClass} h-20 resize-none`} value={item.description} onChange={e => update(i, 'description', e.target.value)} />
            </div>
          )}
        </div>
      ))}
      <button onClick={add} className="text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded px-3 py-2 w-full">
        + Ajouter
      </button>
    </div>
  );
}

export default function ExperienceEditor({ initialData }: { initialData: ExperienceData }) {
  const [data, setData] = useState<ExperienceData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'experience' | 'education'>('experience');

  async function save() {
    setSaving(true);
    await fetch('/api/admin/data/experience', {
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
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        {(['experience', 'education'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 text-sm border-b-2 transition-colors ${tab === t ? 'border-foreground text-foreground' : 'border-transparent text-gray-400'}`}
          >
            {t === 'experience' ? 'Expérience' : 'Formation'}
          </button>
        ))}
      </div>

      {tab === 'experience' ? (
        <ItemList items={data.experience} onChange={items => setData(d => ({ ...d, experience: items }))} />
      ) : (
        <ItemList items={data.education} onChange={items => setData(d => ({ ...d, education: items }))} />
      )}

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
