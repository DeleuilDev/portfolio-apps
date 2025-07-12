import Link from "next/link";
import { Github, Twitter, Linkedin, FileText, Laptop } from "lucide-react";
import homeData from "@/data/home.json";

export default function SocialIcons() {
  const iconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    cv: FileText,
    laptop: Laptop,
  };

  return (
    <div className="flex gap-4">
      {homeData.homeShortcuts.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
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