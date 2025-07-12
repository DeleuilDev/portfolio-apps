import { Github, Globe } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

const GitLabIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.918 1.263c-.135-.423-.73-.423-.867 0L1.387 9.452-.955 13.587a.849.849 0 00.308 1.005L12 21.667l10.647-7.075a.849.849 0 00.308-1.005z"/>
  </svg>
);

function getPlatformIcon(url: string) {
  if (url.includes('github.com')) {
    return Github;
  } else if (url.includes('gitlab.') || url.includes('etulab.')) {
    return GitLabIcon;
  } else {
    return Globe;
  }
}

export default function ProjectCard({ title, description, tags, githubUrl }: ProjectCardProps) {
  const PlatformIcon = getPlatformIcon(githubUrl);

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block min-h-[200px] bg-card rounded-lg p-4 flex flex-col hover:bg-card/80 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="text-base font-medium text-foreground leading-tight flex-1">{title}</h3>
        <PlatformIcon 
          size={16} 
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5"
        />
      </div>
      <p className="text-sm text-gray-500 mb-4 flex-1 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-[9px] sm:text-[10px] bg-secondary text-foreground px-2 py-1 rounded-full opacity-70 whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
} 