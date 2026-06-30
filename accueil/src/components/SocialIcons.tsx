import Link from "next/link";
import { Github, Twitter, Linkedin, FileText, Laptop } from "lucide-react";

interface Shortcut { icon: string; href: string; label: string; }

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  cv: FileText,
  laptop: Laptop,
};

export default function SocialIcons({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <div className="flex gap-4">
      {shortcuts.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        if (!Icon) return null;
        return (
          <Link
            key={item.label}
            href={item.href}
            className="text-gray-500 hover:text-foreground transition-colors"
            target={item.href.startsWith('http') ? '_blank' : '_self'}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </div>
  );
}
