"use client";

import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import SkillBadge from "@/components/SkillBadge";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedSection from "@/components/AnimatedSection";
import { Globe } from "lucide-react";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import personalData from "@/data/personal.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";

export default function CV() {
  return (
    <div className="min-h-screen bg-background font-mono pt-20 pb-8 px-8 md:p-30 relative">
      {/* Decorative dots background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-dots-pattern bg-repeat"></div>
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection animation="fade-in-up" className="mb-16">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {personalData.personal.name}
            </h1>
            <ThemeToggle />
          </div>
          <h2 className="text-xl font-semibold text-gray-500 mb-2">
            {personalData.about.role}
          </h2>
          <p className="text-gray-500 mb-4 flex items-center gap-1">
            <Globe size={16} />
            {personalData.personal.location}
          </p>
          <div className="flex gap-4">
            <a
              href={`mailto:${personalData.personal.email}`}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            {personalData.personal.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={social.name}
              >
                {social.icon === 'linkedin' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                )}
                {social.icon === 'twitter' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {social.icon === 'github' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
              </a>
            ))}
            <span className="mx-2 border-l border-gray-300" />
            <PDFDownloadButton />
          </div>
        </AnimatedSection>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Experience
          </h2>
          {experienceData.experience.map((item, index) => (
            <AnimatedSection
              key={index}
              animation="fade-in-up"
              delay={200 + index * 100}
            >
              <TimelineItem
                title={item.title}
                company={item.company}
                period={item.period}
                description={item.description}
              />
            </AnimatedSection>
          ))}
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Education
          </h2>
          {experienceData.education.map((item, index) => (
            <AnimatedSection
              key={index}
              animation="fade-in-up"
              delay={200 + index * 100}
            >
              <TimelineItem
                title={item.title}
                company={item.company}
                period={item.period}
                description={item.description}
              />
            </AnimatedSection>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectsData.projects.map((project, index) => (
              <AnimatedSection
                key={index}
                animation="fade-in-up"
                delay={200 + index * 100}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                />
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skillsData.skills.map((skill, index) => (
              <AnimatedSection
                key={index}
                animation="fade-in"
                delay={100 + index * 50}
              >
                <SkillBadge name={skill.name} icon={skill.icon} />
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
