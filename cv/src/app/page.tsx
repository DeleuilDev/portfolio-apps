import CVClient from '@/components/CVClient';

async function fetchData(key: string) {
  const apiUrl = process.env.API_URL ?? 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/data/${key}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function CV() {
  const [personalData, projectsData, skillsData, experienceData, cvData] = await Promise.all([
    fetchData('personal'),
    fetchData('projects'),
    fetchData('skills'),
    fetchData('experience'),
    fetchData('cv'),
  ]);

  return (
    <CVClient
      personalData={personalData ?? {}}
      projectsData={projectsData ?? { projects: [] }}
      skillsData={skillsData ?? { skills: [] }}
      experienceData={experienceData ?? { experience: [], education: [] }}
      cvData={cvData ?? { cv: { title: '', summary: '', skills: {}, languages: {} } }}
    />
  );
}
