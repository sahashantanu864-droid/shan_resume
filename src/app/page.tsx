"use client";

import React from "react";
import HeroSection from "@/components/sections/hero";
import Skiper31 from "@/components/ui/skiper-ui/skiper31";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import EducationSection from "@/components/sections/education";
import ExperienceSection from "@/components/sections/experience";
import ContactSection from "@/components/sections/contact";

export default function MainPage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <HeroSection />
      <Skiper31 />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
