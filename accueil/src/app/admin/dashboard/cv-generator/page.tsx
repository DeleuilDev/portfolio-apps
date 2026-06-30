import { db } from '@/lib/db';
import CVGeneratorClient from './CVGeneratorClient';
import type { CVGeneratorData } from '@/components/CVGeneratorPDF';

export default async function CVGeneratorPage() {
  const [personalEntry, experienceEntry, cvEntry] = await Promise.all([
    db.dataStore.findUnique({ where: { key: 'personal' } }),
    db.dataStore.findUnique({ where: { key: 'experience' } }),
    db.dataStore.findUnique({ where: { key: 'cv' } }),
  ]);

  const personal = personalEntry ? JSON.parse(personalEntry.data) : {};
  const experience = experienceEntry ? JSON.parse(experienceEntry.data) : { experience: [], education: [] };
  const cvMeta = cvEntry ? JSON.parse(cvEntry.data) : { cv: { title: '', summary: '', skills: {}, languages: {} } };

  const initialData: CVGeneratorData = {
    personal: {
      name: personal.personal?.name ?? '',
      email: personal.personal?.email ?? '',
      website: personal.personal?.website ?? '',
      location: personal.personal?.location ?? '',
      linkedin: personal.personal?.linkedin ?? '',
    },
    jobTitle: cvMeta.cv?.title ?? '',
    summary: cvMeta.cv?.summary ?? '',
    experience: (experience.experience ?? []).map((e: { title: string; company: string; period: string; description: string }) => ({
      title: e.title,
      company: e.company,
      period: e.period,
      description: e.description,
    })),
    education: (experience.education ?? []).map((e: { title: string; company: string; period: string; description: string }) => ({
      title: e.title,
      company: e.company,
      period: e.period,
      description: e.description,
    })),
    skills: Object.entries(cvMeta.cv?.skills ?? {}).map(([category, list]) => ({
      category,
      list: list as string,
    })),
    languages: Object.entries(cvMeta.cv?.languages ?? {}).map(([name, level]) => ({
      name,
      level: level as string,
    })),
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Générateur de CV</h1>
      <p className="text-sm text-gray-500 mb-8">
        Pré-rempli depuis la base de données. Modifie à la volée sans affecter le site.
      </p>
      <CVGeneratorClient initialData={initialData} />
    </div>
  );
}
