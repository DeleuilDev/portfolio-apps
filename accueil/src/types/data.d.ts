interface Personal {
  name: string;
  handle: string;
  email: string;
  website: string;
  location: string;
  linkedin: string;
  github: string;
  socials: {
    name: string;
    url: string;
    icon: string;
  }[];
}

interface HomeShortcut {
  icon: string;
  href: string;
  label: string;
}

interface About {
  role: string;
  description: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Data {
  personal: Personal;
  about: About;
  experience: Experience[];
  homeShortcuts: HomeShortcut[];
}

declare module '@/data/data.json' {
  const value: Data;
  export default value;
} 