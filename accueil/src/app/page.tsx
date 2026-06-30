import { db } from '@/lib/db';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  const [personalEntry, experienceEntry, homeEntry] = await Promise.all([
    db.dataStore.findUnique({ where: { key: 'personal' } }),
    db.dataStore.findUnique({ where: { key: 'experience' } }),
    db.dataStore.findUnique({ where: { key: 'home' } }),
  ]);

  const personalData = personalEntry ? JSON.parse(personalEntry.data) : {};
  const experienceData = experienceEntry ? JSON.parse(experienceEntry.data) : { experience: [] };
  const homeData = homeEntry ? JSON.parse(homeEntry.data) : { homeShortcuts: [] };

  return <HomeClient personalData={personalData} experienceData={experienceData} homeData={homeData} />;
}
