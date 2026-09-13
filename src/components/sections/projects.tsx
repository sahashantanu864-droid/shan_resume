"use client";

import React, { useState } from "react";
import SectionWrapper from "../ui/section-wrapper";
import SectionHeader from "./section-header";
import { PROJECTS, Project } from "@/data/projects";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  Layers,
  Maximize2,
  Activity,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { ScrollText } from "../ui/scroll-text";
import { ScrollFollow, ScrollFollowStroke } from "../ui/scroll-follow";
import { MagneticButton } from "../ui/magnetic-button";

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        id="projects"
        badge="Engineering Portfolio"
        title="Featured Systems & Projects"
        desc="Production-grade architectures, spatial algorithms, and full-stack implementations."
      />

      <div className="relative grid grid-cols-1 gap-12">
        {/* Skiper19 Connecting Storm Stroke */}
        <div className="hidden xl:block absolute -left-10 top-20 opacity-20 pointer-events-none">
          <ScrollFollowStroke height={400} strokeWidth={2} strokeColor="rgba(255,255,255,0.4)" />
        </div>

        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDeepDive={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Deep-Dive Architecture Dialog in Pitch-Black Obsidian */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl bg-[#060608] border-white/15 text-white shadow-2xl shadow-black">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                  {selectedProject.category}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121216] border border-white/10 text-zinc-300">
                  {selectedProject.status}
                </span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-display text-white">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Engineering Architecture & Deep-Dive Specifications
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  System Overview
                </h4>
                <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Metrics */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-white/10 bg-[#0c0c10] text-center"
                    >
                      <div className="text-xs font-mono font-semibold text-white truncate">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Engineering Highlights */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Core Engineering Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.engineeringHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-white/10 bg-[#09090c] space-y-1"
                    >
                      <span className="text-xs font-semibold text-white font-sans block">
                        {highlight.title}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Tech Stack */}
              <div>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Verified Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t.name}
                      className="font-mono text-xs py-1 px-2.5 rounded-md bg-[#101014] border border-white/10 text-zinc-300"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links with MagneticButtons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <MagneticButton strength={0.25}>
                  <Link
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="gap-2 bg-[#0d0d11] border-white/15 text-zinc-100 hover:text-white hover:border-white/40">
                      <Github className="w-4 h-4" />
                      <span>View Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </Button>
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.25}>
                  <Button
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="bg-white text-black hover:bg-zinc-200 font-semibold"
                  >
                    Close
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionWrapper>
  );
};

const ProjectCard = ({
  project,
  onOpenDeepDive,
}: {
  project: Project;
  onOpenDeepDive: () => void;
}) => {
  return (
    <Card className="overflow-hidden border-white/10 bg-[#08080a]/90 backdrop-blur-md hover:border-white/20 hover:shadow-2xl hover:shadow-black transition-all duration-300 shadow-xl shadow-black">
      {/* Top Banner & Status Header */}
      <div className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0e]">
        <div>
          <ScrollFollow speed={-6}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400">
                {project.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#121216] border border-white/10 text-zinc-300">
                {project.status}
              </span>
            </div>
          </ScrollFollow>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* Quick Action Links with MagneticButtons */}
        <div className="flex items-center gap-3">
          <MagneticButton strength={0.2}>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 block"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-lg font-medium text-xs bg-[#0e0e12] border-white/15 text-zinc-100 hover:text-white hover:border-white/40"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </Button>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.2}>
            <Button
              size="sm"
              onClick={onOpenDeepDive}
              className="gap-2 rounded-lg font-semibold text-xs shadow-sm bg-white text-black hover:bg-zinc-200"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Architecture Deep-Dive</span>
            </Button>
          </MagneticButton>
        </div>
      </div>

      <CardContent className="p-6 md:p-8 space-y-8">
        {/* Description with Skiper31 Line-by-Line Animation */}
        <div className="w-full max-w-4xl">
          <ScrollText
            as="p"
            offset={["start 0.9", "start 0.45"]}
            className="w-full text-base sm:text-lg text-zinc-300 leading-relaxed font-sans"
          >
            {project.shortDescription}
          </ScrollText>
        </div>

        {/* System Metrics Bar with Skiper19 Scroll-Follow */}
        {project.metrics && (
          <ScrollFollow speed={8} className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-white/10 bg-[#0a0a0e] shadow-inner"
                >
                  <div className="text-xs text-zinc-400 font-mono">
                    {metric.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-display mt-0.5 truncate">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </ScrollFollow>
        )}

        {/* Key Features List */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-300" />
            <span>Key Engineering Implementations</span>
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-300">
            {project.keyFeatures.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 p-3 rounded-xl border border-white/10 bg-[#09090c]"
              >
                <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified Tech Stack */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-semibold flex items-center gap-2">
            <Cpu className="w-4 h-4 text-zinc-300" />
            <span>Technologies & Dependencies Used</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 py-1.5 px-3 text-xs font-mono rounded-lg bg-[#0e0e12] border border-white/10 text-zinc-200"
              >
                {tech.iconPath && (
                  <span
                    role="img"
                    aria-label={tech.name}
                    className="block w-3.5 h-3.5 bg-current"
                    style={{
                      WebkitMaskImage: `url(${tech.iconPath})`,
                      maskImage: `url(${tech.iconPath})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                )}
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 md:p-8 pt-0 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 mt-4">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Activity className="w-3.5 h-3.5 text-zinc-300" />
          <span>PostGIS GiST • McFeeters NDWI • Multi-Criteria Solver</span>
        </div>
        <MagneticButton strength={0.2}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenDeepDive}
            className="text-xs font-medium gap-1 text-zinc-300 hover:text-white hover:bg-white/5"
          >
            <span>Explore Architecture Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </MagneticButton>
      </CardFooter>
    </Card>
  );
};

export default ProjectsSection;
