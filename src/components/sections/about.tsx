"use client";

import React from "react";
import SectionWrapper from "../ui/section-wrapper";
import SectionHeader from "./section-header";
import { config } from "@/data/config";
import { Card, CardContent } from "../ui/card";
import {
  Database,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { ScrollText } from "../ui/scroll-text";
import { ScrollFollow } from "../ui/scroll-follow";

export const AboutSection = () => {
  const highlights = [
    {
      icon: <Terminal className="w-5 h-5 text-zinc-200" />,
      title: "Python Backend Engineering",
      desc: "Architecting clean, modular FastAPI and Python services with strict Pydantic schemas and test suites.",
    },
    {
      icon: <Database className="w-5 h-5 text-zinc-300" />,
      title: "Data Persistence & GIS",
      desc: "Designing SQL relational models, PostGIS spatial queries, and NoSQL/Firebase real-time document sync.",
    },
    {
      icon: <Layers className="w-5 h-5 text-zinc-300" />,
      title: "Full-Stack Integration",
      desc: "Bridging complex backend logic, asynchronous processing, and geospatial feeds with modern React interfaces.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-zinc-200" />,
      title: "Security & Reliability",
      desc: "Implementing deterministic validators, secure credential isolation, and production Docker containerization.",
    },
  ];

  return (
    <SectionWrapper id="about">
      <SectionHeader
        id="about"
        badge="About Me"
        title="Engineering Practical Solutions"
        desc="A focused look at my development philosophy and core specializations."
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Narrative Card with Skiper31 Line-by-Line Animation */}
        <Card className="lg:col-span-7 border-white/10 bg-[#08080a]/90 backdrop-blur-md hover:border-white/20 transition-all shadow-xl shadow-black">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
              <span className="text-xs font-mono text-zinc-500 ml-2">
                developer-bio.py
              </span>
            </div>

            <ScrollText
              as="p"
              offset={["start 0.9", "start 0.45"]}
              className="w-full text-base sm:text-lg text-zinc-200 leading-relaxed font-sans"
            >
              {config.about}
            </ScrollText>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                <span>Clean API Contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                <span>Deterministic Systems</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                <span>Spatial & Real-Time Data</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Pillars Grid with Skiper19 Scroll-Follow */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {highlights.map((item, index) => (
            <ScrollFollow key={index} speed={6 + index * 3} className="w-full block">
              <Card
                className="border-white/10 bg-[#0a0a0d]/85 hover:bg-[#121216] hover:border-white/25 transition-all duration-300 shadow-md shadow-black"
              >
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#131317] border border-white/10 shrink-0 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-semibold text-white font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollFollow>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
