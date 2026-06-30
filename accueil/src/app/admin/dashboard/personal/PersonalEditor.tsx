'use client';

import { useState } from 'react';

interface Social { name: string; url: string; icon: string; }
interface PersonalData {
  personal: { name: string; handle: string; email: string; website: string; location: string; linkedin: string; github: string; socials: Social[]; };
  about: { role: string; description: string; };
}

export default function PersonalEditor({ initialData }: { initialData: PersonalData }) {
  const [data, setData] = useState<PersonalData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updatePersonal(field: string, value: string) {
    setData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }

  function updateAbout(field: string, value: string) {
    setData(d => ({ ...d, about: { ...d.about, [field]: value } }));
  }

  function updateSocial(index: number, field: string, value: string) {
    setData(d => {
      const socials = [...d.personal.socials];
      socials[index] = { ...socials[index], [field]: value };
      return { ...d, personal: { ...d.personal, socials } };
    });
  }

  function addSocial() {
    setData(d => ({
      ...d,
      personal: { ...d.personal, socials: [...(d.personal.socials ?? []), { name: '', url: '', icon: '' }] },
    }));
  }

  function removeSocial(index: number) {
    setData(d => {
      const socials = d.personal.socials.filter((_, i) => i !== index);
      return { ...d, personal: { ...d.personal, socials } };
    });
  }

  async function save() {
    setSaving(true);
    await fetch('/api/admin/data/personal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputClass = 'w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-foreground';
  const labelClass = 'text-xs text-gray-500 mb-1 block';

  return (
    <div className="space-y-8 max-w-xl">
      <section>
        <h2 className="font-semibold mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-2 gap-4">
          {(['name', 'handle', 'email', 'website', 'location', 'linkedin', 'github'] as const).map(field => (
            <div key={field}>
              <label className={labelClass}>{field}</label>
              <input
                className={inputClass}
                value={data.personal?.[field] ?? ''}
                onChange={e => updatePersonal(field, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-4">À propos</h2>
        <div className="space-y-3">
          <div>
            <label className={labelClass}>role</label>
            <input className={inputClass} value={data.about?.role ?? ''} onChange={e => updateAbout('role', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>description</label>
            <textarea
              className={`${inputClass} h-24 resize-none`}
              value={data.about?.description ?? ''}
              onChange={e => updateAbout('description', e.target.value)}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Réseaux sociaux (CV)</h2>
          <button onClick={addSocial} className="text-xs text-gray-500 hover:text-foreground border border-gray-300 rounded px-2 py-1">+ Ajouter</button>
        </div>
        <div className="space-y-3">
          {(data.personal?.socials ?? []).map((social, i) => (
            <div key={i} className="flex gap-2 items-start">
              <input placeholder="name" className={`${inputClass} flex-1`} value={social.name} onChange={e => updateSocial(i, 'name', e.target.value)} />
              <input placeholder="url" className={`${inputClass} flex-[2]`} value={social.url} onChange={e => updateSocial(i, 'url', e.target.value)} />
              <input placeholder="icon" className={`${inputClass} w-24`} value={social.icon} onChange={e => updateSocial(i, 'icon', e.target.value)} />
              <button onClick={() => removeSocial(i)} className="text-red-400 hover:text-red-600 text-sm px-2 py-1.5">✕</button>
            </div>
          ))}
        </div>
      </section>

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
