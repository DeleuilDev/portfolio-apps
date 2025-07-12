'use client';

import SocialIcons from "@/components/SocialIcons";
import ThemeToggle from "@/components/ThemeToggle";
import TimelineItem from "@/components/TimelineItem";
import AnimatedSection from "@/components/AnimatedSection";
import personalData from "@/data/personal.json";
import experienceData from "@/data/experience.json";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Decorative dots background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-dots-pattern bg-repeat"></div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-16 max-w-2xl mx-auto font-mono relative z-10">
        <div className="w-full">
          <div className="flex items-start justify-between mb-12">
            <div>
              <AnimatedSection animation="fade-in-up" delay={200}>
                <h1 className="text-3xl font-semibold text-foreground mb-2">{personalData.personal.handle}</h1>
              </AnimatedSection>
              <AnimatedSection animation="fade-in-up" delay={400}>
                <p className="text-gray-500 mb-6">
                  {personalData.about.role}
                </p>
              </AnimatedSection>
              <AnimatedSection animation="slide-in-left" delay={600}>
                <SocialIcons />
              </AnimatedSection>
            </div>
            <AnimatedSection animation="fade-in" delay={800}>
              <ThemeToggle />
            </AnimatedSection>
          </div>
          
          <div className="space-y-6">
            {experienceData.experience.map((item, index) => (
              <AnimatedSection 
                key={index}
                animation="fade-in-up" 
                delay={1000 + (index * 200)}
              >
                <TimelineItem
                  title={item.title}
                  company={item.company}
                  period={item.period}
                  description={item.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
