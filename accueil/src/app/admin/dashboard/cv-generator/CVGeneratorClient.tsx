'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVGeneratorPDF, { CVGeneratorData } from '@/components/CVGeneratorPDF';

const inputClass = 'w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-foreground font-mono';
const labelClass = 'text-xs text-gray-500 mb-1 block';

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-semibold text-sm">{title}</span>
        <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-1 border-t border-gray-200 dark:border-gray-700 space-y-3">{children}</div>}
    </div>
  );
}

export default function CVGeneratorClient({ initialData }: { initialData: CVGeneratorData }) {
  const [data, setData] = useState<CVGeneratorData>(initialData);
  const [isClient, setIsClient] = useState(false);
  const [fileName, setFileName] = useState('CV_Marius_Deleuil.pdf');

  useEffect(() => { setIsClient(true); }, []);

  function updatePersonal(field: string, value: string) {
    setData(d => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }

  function updateExp(i: number, field: string, value: string) {
    setData(d => {
      const experience = [...d.experience];
      experience[i] = { ...experience[i], [field]: value };
      return { ...d, experience };
    });
  }

  function addExp() {
    setData(d => ({ ...d, experience: [...d.experience, { title: '', company: '', period: '', description: '' }] }));
  }

  function removeExp(i: number) {
    setData(d => ({ ...d, experience: d.experience.filter((_, j) => j !== i) }));
  }

  function updateEdu(i: number, field: string, value: string) {
    setData(d => {
      const education = [...d.education];
      education[i] = { ...education[i], [field]: value };
      return { ...d, education };
    });
  }

  function addEdu() {
    setData(d => ({ ...d, education: [...d.education, { title: '', company: '', period: '', description: '' }] }));
  }

  function removeEdu(i: number) {
    setData(d => ({ ...d, education: d.education.filter((_, j) => j !== i) }));
  }

  function updateSkill(i: number, field: 'category' | 'list', value: string) {
    setData(d => {
      const skills = [...d.skills];
      skills[i] = { ...skills[i], [field]: value };
      return { ...d, skills };
    });
  }

  function addSkill() {
    setData(d => ({ ...d, skills: [...d.skills, { category: '', list: '' }] }));
  }

  function removeSkill(i: number) {
    setData(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }));
  }

  function updateLang(i: number, field: 'name' | 'level', value: string) {
    setData(d => {
      const languages = [...d.languages];
      languages[i] = { ...languages[i], [field]: value };
      return { ...d, languages };
    });
  }

  function addLang() {
    setData(d => ({ ...d, languages: [...d.languages, { name: '', level: '' }] }));
  }

  function removeLang(i: number) {
    setData(d => ({ ...d, languages: d.languages.filter((_, j) => j !== i) }));
  }

  function resetToInitial() {
    setData(initialData);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8 max-w-5xl">
      {/* Form */}
      <div className="space-y-4">
        {/* Poste visé — always open, most important */}
        <Section title="Poste visé" defaultOpen>
          <div>
            <label className={labelClass}>Intitulé du poste</label>
            <input
              className={inputClass}
              value={data.jobTitle}
              onChange={e => setData(d => ({ ...d, jobTitle: e.target.value }))}
              placeholder="ex: Full Stack Engineer — Web3 & DeFi"
            />
          </div>
          <div>
            <label className={labelClass}>Résumé professionnel</label>
            <textarea
              className={`${inputClass} h-28 resize-none`}
              value={data.summary}
              onChange={e => setData(d => ({ ...d, summary: e.target.value }))}
              placeholder="Summary professionnel pour ce poste..."
            />
          </div>
        </Section>

        {/* Expériences */}
        <Section title="Expériences professionnelles" defaultOpen>
          {data.experience.map((exp, i) => (
            <div key={i} className="border border-gray-100 dark:border-gray-700 rounded p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">{exp.title || `Expérience ${i + 1}`}</span>
                <button onClick={() => removeExp(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Titre</label>
                  <input className={inputClass} value={exp.title} onChange={e => updateExp(i, 'title', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Entreprise</label>
                  <input className={inputClass} value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Période</label>
                <input className={inputClass} value={exp.period} onChange={e => updateExp(i, 'period', e.target.value)} placeholder="ex: 2022 - Present" />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea className={`${inputClass} h-20 resize-none`} value={exp.description} onChange={e => updateExp(i, 'description', e.target.value)} />
              </div>
            </div>
          ))}
          <button onClick={addExp} className="w-full text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded py-2">
            + Ajouter une expérience
          </button>
        </Section>

        {/* Compétences */}
        <Section title="Compétences techniques" defaultOpen>
          {data.skills.map((s, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="w-32 flex-shrink-0">
                <label className={labelClass}>Catégorie</label>
                <input className={inputClass} value={s.category} onChange={e => updateSkill(i, 'category', e.target.value)} placeholder="frontend" />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Technologies</label>
                <input className={inputClass} value={s.list} onChange={e => updateSkill(i, 'list', e.target.value)} placeholder="React, TypeScript..." />
              </div>
              <button onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-600 text-xs mt-5 px-1">✕</button>
            </div>
          ))}
          <button onClick={addSkill} className="w-full text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded py-2">
            + Ajouter une catégorie
          </button>
        </Section>

        {/* Langues */}
        <Section title="Langues" defaultOpen>
          {data.languages.map((l, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className={labelClass}>Langue</label>
                <input className={inputClass} value={l.name} onChange={e => updateLang(i, 'name', e.target.value)} placeholder="Français" />
              </div>
              <div className="flex-1">
                <label className={labelClass}>Niveau</label>
                <input className={inputClass} value={l.level} onChange={e => updateLang(i, 'level', e.target.value)} placeholder="Natif" />
              </div>
              <button onClick={() => removeLang(i)} className="text-red-400 hover:text-red-600 text-xs mb-1.5 px-1">✕</button>
            </div>
          ))}
          <button onClick={addLang} className="w-full text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded py-2">
            + Ajouter une langue
          </button>
        </Section>

        {/* Formation — collapsed by default, changes less */}
        <Section title="Formation" defaultOpen={false}>
          {data.education.map((edu, i) => (
            <div key={i} className="border border-gray-100 dark:border-gray-700 rounded p-3 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">{edu.title || `Formation ${i + 1}`}</span>
                <button onClick={() => removeEdu(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>Diplôme / Titre</label>
                  <input className={inputClass} value={edu.title} onChange={e => updateEdu(i, 'title', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>École</label>
                  <input className={inputClass} value={edu.company} onChange={e => updateEdu(i, 'company', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Période</label>
                <input className={inputClass} value={edu.period} onChange={e => updateEdu(i, 'period', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Description (optionnel)</label>
                <textarea className={`${inputClass} h-16 resize-none`} value={edu.description} onChange={e => updateEdu(i, 'description', e.target.value)} />
              </div>
            </div>
          ))}
          <button onClick={addEdu} className="w-full text-sm text-gray-500 hover:text-foreground border border-dashed border-gray-300 rounded py-2">
            + Ajouter une formation
          </button>
        </Section>

        {/* Infos personnelles — collapsed by default */}
        <Section title="Informations personnelles" defaultOpen={false}>
          {(['name', 'email', 'website', 'location', 'linkedin'] as const).map(field => (
            <div key={field}>
              <label className={labelClass}>{field}</label>
              <input className={inputClass} value={data.personal[field]} onChange={e => updatePersonal(field, e.target.value)} />
            </div>
          ))}
        </Section>
      </div>

      {/* Sticky sidebar — download + filename */}
      <div className="xl:sticky xl:top-8 space-y-4 self-start">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-4 space-y-4">
          <h2 className="font-semibold text-sm">Exporter</h2>

          <div>
            <label className={labelClass}>Nom du fichier</label>
            <input
              className={inputClass}
              value={fileName}
              onChange={e => setFileName(e.target.value)}
              placeholder="CV_Nom_Prenom.pdf"
            />
          </div>

          {isClient ? (
            <PDFDownloadLink
              document={<CVGeneratorPDF data={data} />}
              fileName={fileName || 'CV.pdf'}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-foreground text-background rounded hover:opacity-80 transition-opacity text-sm font-mono"
            >
              {({ loading }) => loading ? 'Génération...' : '⬇ Télécharger le PDF'}
            </PDFDownloadLink>
          ) : (
            <div className="w-full py-2.5 bg-foreground text-background rounded opacity-50 text-sm text-center font-mono">
              ⬇ Télécharger le PDF
            </div>
          )}

          <button
            onClick={resetToInitial}
            className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-500 hover:text-foreground hover:border-foreground transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        {/* Quick summary */}
        <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-foreground text-xs mb-2">Aperçu</p>
          <p><span className="text-foreground">{data.jobTitle || '—'}</span></p>
          <p>{data.experience.length} expérience{data.experience.length !== 1 ? 's' : ''}</p>
          <p>{data.education.length} formation{data.education.length !== 1 ? 's' : ''}</p>
          <p>{data.skills.length} catégorie{data.skills.length !== 1 ? 's' : ''} de compétences</p>
          <p>{data.languages.length} langue{data.languages.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
}
