export interface ExperienceEntry {
  id: string;
  type: "internship" | "hackathon" | "open-source" | "certification" | "award";
  title: string;
  organization: string;
  period?: string;
  location?: string;
  description: string[];
  skills?: string[];
  link?: string;
}

// Architecture ready for entries: add your completed hackathons, internships, certifications, etc.
export const EXPERIENCES: ExperienceEntry[] = [];

export const UPCOMING_AREAS = [
  {
    category: "Internships & Industry Projects",
    status: "Open for Opportunities",
    note: "Actively seeking Full-Stack and Python Backend roles to build scalable production APIs and distributed systems.",
  },
  {
    category: "Hackathons & Technical Challenges",
    status: "Upcoming & In Progress",
    note: "Engineering real-time disaster-response, spatial mapping, and full-stack solutions.",
  },
  {
    category: "Open Source Contributions",
    status: "Active Contributor",
    note: "Contributing to Python, GIS, and modern TypeScript web development ecosystems.",
  },
  {
    category: "Certifications & Specializations",
    status: "Continuous Learning",
    note: "Deepening practical expertise in cloud backend architectures, PostGIS spatial data, and containerization.",
  },
];
