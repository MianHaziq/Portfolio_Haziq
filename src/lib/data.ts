export const siteConfig = {
  name: "Alex Chen",
  role: "Software Engineer",
  tagline: "Building digital experiences that matter",
  bio: "I'm a software engineer with a passion for crafting elegant, high-performance applications. From pixel-perfect frontends to scalable backends, I bring ideas to life with clean code and thoughtful architecture.",
  email: "alex.chen@example.com",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  twitter: "https://twitter.com/alexchen",
  education: {
    degree: "BS Software Engineering",
    institution: "University of Central Punjab",
    year: "2023",
  },
};

export const skills = [
  { name: "React / Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Framer Motion / GSAP", level: 80, category: "frontend" },
  { name: "Node.js / NestJS", level: 82, category: "backend" },
  { name: "FastAPI / Python", level: 75, category: "backend" },
  { name: "PostgreSQL", level: 78, category: "backend" },
  { name: "Docker", level: 70, category: "devops" },
  { name: "REST & GraphQL APIs", level: 85, category: "backend" },
];

export const techStack = {
  Frontend: [
    { name: "Next.js", icon: "▲" },
    { name: "React", icon: "⚛" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Framer Motion", icon: "◉" },
    { name: "GSAP", icon: "⚡" },
  ],
  Backend: [
    { name: "Node.js", icon: "◈" },
    { name: "NestJS", icon: "🐈" },
    { name: "FastAPI", icon: "🚀" },
    { name: "Python", icon: "🐍" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "REST / GraphQL", icon: "◎" },
  ],
  DevOps: [
    { name: "Docker", icon: "🐳" },
    { name: "Git / GitHub", icon: "⑂" },
    { name: "Vercel", icon: "▲" },
    { name: "Linux", icon: "🐧" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Nexus Dashboard",
    description:
      "A real-time analytics dashboard built with Next.js and WebSockets. Features live data streaming, interactive charts, and role-based access control.",
    tags: ["Next.js", "TypeScript", "WebSockets", "PostgreSQL", "Docker"],
    gradient: "from-indigo-500 to-violet-600",
    github: "https://github.com/alexchen/nexus",
    live: "https://nexus-dashboard.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "AuraBlog Platform",
    description:
      "A headless CMS-powered blog platform with MDX support, full-text search, and a custom editor. Built for performance with 100 Lighthouse scores.",
    tags: ["React", "FastAPI", "Python", "PostgreSQL", "S3"],
    gradient: "from-violet-500 to-purple-600",
    github: "https://github.com/alexchen/aurablog",
    live: "https://aurablog.io",
    featured: true,
  },
  {
    id: 3,
    title: "TaskFlow API",
    description:
      "A production-grade REST API for a task management system with JWT auth, rate limiting, event-driven architecture, and comprehensive test coverage.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    gradient: "from-sky-500 to-indigo-600",
    github: "https://github.com/alexchen/taskflow",
    live: "https://taskflow-api.io",
    featured: false,
  },
  {
    id: 4,
    title: "Luminary UI Kit",
    description:
      "An open-source component library with 40+ accessible, animated React components built with Tailwind CSS and Framer Motion.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion", "Storybook"],
    gradient: "from-rose-500 to-pink-600",
    github: "https://github.com/alexchen/luminary",
    live: "https://luminary-ui.io",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "TechVault Solutions",
    period: "Mar 2024 – Present",
    description:
      "Building scalable full-stack features using Next.js and NestJS. Led the migration of a monolithic API to microservices, reducing latency by 40%.",
    highlights: [
      "Architected REST APIs serving 50k+ daily users",
      "Reduced page load times by 35% through SSR optimization",
      "Mentored 2 junior developers on TypeScript best practices",
    ],
  },
  {
    id: 2,
    role: "Frontend Engineer Intern",
    company: "Pixel Forge Agency",
    period: "Jun 2023 – Feb 2024",
    description:
      "Developed interactive marketing sites and web apps for clients across fintech and e-commerce verticals.",
    highlights: [
      "Delivered 8 client projects on time and within scope",
      "Built reusable animation component library with GSAP",
      "Improved Core Web Vitals scores across all projects",
    ],
  },
];
