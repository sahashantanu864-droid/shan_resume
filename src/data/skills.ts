export interface SkillItem {
  name: string;
  label: string;
  description: string;
  color: string;
  iconPath?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    description: "High-performance Python architectures, asynchronous services, and robust REST APIs",
    skills: [
      {
        name: "python",
        label: "Python",
        description: "Core backend development, algorithmic services, and spatial data processing",
        color: "#3776ab",
        iconPath: "/assets/logos/python-mono.svg",
      },
      {
        name: "fastapi",
        label: "FastAPI",
        description: "Modern, high-throughput asynchronous APIs with OpenAPI docs and Pydantic validation",
        color: "#009688",
        iconPath: "/assets/logos/fastapi-mono.svg",
      },
      {
        name: "rest-apis",
        label: "REST APIs",
        description: "Clean resource modeling, HTTP semantics, structured error handling, and auth workflows",
        color: "#6366f1",
        iconPath: "/assets/logos/hono-mono.svg",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Responsive, accessible, and interactive user interfaces with modern web standards",
    skills: [
      {
        name: "react",
        label: "React",
        description: "Component-driven architecture, state management, and modern hooks",
        color: "#61dafb",
        iconPath: "/assets/logos/react-mono.svg",
      },
      {
        name: "typescript",
        label: "TypeScript",
        description: "Type-safe engineering across full-stack applications and frontend interfaces",
        color: "#3178c6",
        iconPath: "/assets/logos/typescript-mono.svg",
      },
      {
        name: "tailwind",
        label: "Tailwind CSS",
        description: "Utility-first responsive design, dark/light theme systems, and micro-interactions",
        color: "#38bdf8",
        iconPath: "/assets/logos/tailwind-css-mono.svg",
      },
      {
        name: "html",
        label: "HTML",
        description: "Semantic document structuring, accessibility (a11y), and responsive web layout",
        color: "#e34f26",
        iconPath: "/assets/logos/javascript-mono.svg",
      },
    ],
  },
  {
    id: "database-cloud",
    title: "Databases & Cloud",
    description: "Relational persistence, NoSQL document stores, PostGIS spatial queries, and Firebase services",
    skills: [
      {
        name: "sql",
        label: "SQL",
        description: "Relational schema design, indexes, joins, and complex query optimization",
        color: "#00758f",
        iconPath: "/assets/logos/sql-mono.svg",
      },
      {
        name: "postgresql",
        label: "PostgreSQL",
        description: "Enterprise relational database with ACID compliance, JSONB, and PostGIS GIS extension",
        color: "#336791",
        iconPath: "/assets/logos/postgresql-mono.svg",
      },
      {
        name: "mongodb",
        label: "MongoDB",
        description: "Document-oriented NoSQL persistence for flexible schema application models",
        color: "#47a248",
        iconPath: "/assets/logos/mongodb-mono.svg",
      },
      {
        name: "firebase",
        label: "Firebase",
        description: "Real-time document sync, authentication systems, and cloud storage integrations",
        color: "#ffca28",
        iconPath: "/assets/logos/firebase-mono.svg",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    description: "Version control workflows, containerization, and developer tooling",
    skills: [
      {
        name: "git",
        label: "Git",
        description: "Branching workflows, version control, collaboration, and pull request reviews",
        color: "#f05032",
        iconPath: "/assets/logos/git-mono.svg",
      },
      {
        name: "docker",
        label: "Docker",
        description: "Containerized application packaging, multi-stage builds, and environment parity",
        color: "#2496ed",
        iconPath: "/assets/logos/docker-mono.svg",
      },
    ],
  },
];
