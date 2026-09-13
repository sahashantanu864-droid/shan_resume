export interface EducationItem {
  degree: string;
  institution: string;
  field: string;
  description: string;
  highlights: string[];
}

export const EDUCATION: EducationItem[] = [
  {
    degree: "Computer Engineering",
    institution: "LOGMIIER / SPPU",
    field: "Computer Science & Engineering",
    description:
      "Rigorous engineering education emphasizing computational theory, software design, backend architectures, database systems, and modern networking.",
    highlights: [
      "Core coursework in Data Structures, Algorithms, Object-Oriented Design, and Database Management Systems",
      "Specialization in Software Architecture, Distributed Systems, and Backend API Development",
      "Hands-on practical development involving real-world computing platforms and systems programming",
    ],
  },
];
