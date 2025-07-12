import { 
  SiDocker, 
  SiGo, 
  SiTypescript, 
  SiRust, 
  SiReact, 
  SiNextdotjs, 
  SiMongodb, 
  SiSolidity, 
  SiEthereum,
  SiJavascript,
  SiNodedotjs,
  SiAngular,
  SiCplusplus,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFigma
} from "react-icons/si";
import { FaJava, FaHammer } from "react-icons/fa";

interface SkillBadgeProps {
  name: string;
  icon: string;
}

export default function SkillBadge({ name, icon }: SkillBadgeProps) {
  const iconMap = {
    javascript: SiJavascript,
    typescript: SiTypescript,
    nodejs: SiNodedotjs,
    react: SiReact,
    nextjs: SiNextdotjs,
    angular: SiAngular,
    reactnative: SiReact, // Using React icon for React Native
    java: FaJava, // Using Font Awesome Java icon
    cpp: SiCplusplus,
    go: SiGo,
    rust: SiRust,
    mongodb: SiMongodb,
    solidity: SiSolidity,
    web3: SiEthereum,
    hardhat: FaHammer, // Using hammer icon for Hardhat (development tool)
    docker: SiDocker,
    photoshop: SiAdobephotoshop,
    illustrator: SiAdobeillustrator,
    figma: SiFigma,
    // Legacy mappings for compatibility
    next: SiNextdotjs,
    mongo: SiMongodb
  };

  const Icon = iconMap[icon as keyof typeof iconMap];

  // Fallback if icon is not found
  if (!Icon) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground">
        <span>{name}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5 text-sm text-foreground">
      <Icon className="w-4 h-4" />
      <span>{name}</span>
    </div>
  );
} 